import  { useState } from 'react';
import { Checkbox, FormControlLabel, IconButton, List, ListItem } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const data = [
  {
    department: "Agriculture & Fishing",
    sub_departments: [
      "Agriculture",
      "Crops",
      "Farming Animals & Livestock",
      "Fishery & Aquaculture",
      "Ranching"
    ]
  },
  {
    department: "Business Services",
    sub_departments: [
      "Accounting & Accounting Services",
      "Auctions",
      "Business Services - General",
      "Call Centers & Business Centers",
      "Career Planning",
      "Career",
      "Commercial Printing",
      "Debt Collection"
    ]
  }
];

function DepartmentList() {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean; }>({});
  const [selectedDepartments, setSelectedDepartments] = useState<{ [key: string]: boolean; }>({});
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<{ [key: string]: { [key: string]: boolean; }; }>({});

  const toggleExpand = (department: string) => {
    setExpanded(prev => ({
      ...prev,
      [department]: !prev[department]
    }));
  };

  const handleDepartmentChange = (department: string) => {
    const newSelectedDepartments = {
      ...selectedDepartments,
      [department]: !selectedDepartments[department]
    };

    const newSelectedSubDepartments = {
      ...selectedSubDepartments,
      [department]: data.find(d => d.department === department)?.sub_departments.reduce((acc, sub) => {
        acc[sub] = !selectedDepartments[department];
        return acc;
      }, {} as { [key: string]: boolean; }) || {}
    };

    setSelectedDepartments(newSelectedDepartments);
    setSelectedSubDepartments(newSelectedSubDepartments);
  };

  const handleSubDepartmentChange = (department: string, subDepartment: string) => {
    const newSelectedSubDepartments = {
      ...selectedSubDepartments,
      [department]: {
        ...selectedSubDepartments[department],
        [subDepartment]: !selectedSubDepartments[department][subDepartment]
      }
    };

    const allSelected = Object.values(newSelectedSubDepartments[department]).every(Boolean);
    const newSelectedDepartments = {
      ...selectedDepartments,
      [department]: allSelected
    };

    setSelectedSubDepartments(newSelectedSubDepartments);
    setSelectedDepartments(newSelectedDepartments);
  };

  return (
    <List>
      {data.map((item, index) => (
        <div key={index}>
          <ListItem>
            <FormControlLabel
              control={<Checkbox
                checked={selectedDepartments[item.department] || false}
                onChange={() => handleDepartmentChange(item.department)} />}
              label={`${item.department} (${item.sub_departments.length})`} />
            <IconButton onClick={() => toggleExpand(item.department)}>
              {expanded[item.department] ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          {expanded[item.department] && (
            <List component="div" disablePadding>
              {item.sub_departments.map((sub, subIndex) => (
                <ListItem key={subIndex} style={{ paddingLeft: 40 }}>
                  <FormControlLabel
                    control={<Checkbox
                      checked={selectedSubDepartments[item.department]?.[sub] || false}
                      onChange={() => handleSubDepartmentChange(item.department, sub)} />}
                    label={sub} />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      ))}
    </List>
  );
}

export default DepartmentList;