import React, { useState } from 'react';
import { SelectionState, TreeDataState, CustomTreeData } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableTreeColumn } from '../src/index';

import { generateRows, defaultColumnValues } from './storybook/generator';

const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};

export const BasicSelection = () => {
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ]);
  const [data] = useState(
    generateRows({
      columnValues: {
        id: ({ index }) => index,
        parentId: ({ index, random }) => (index > 0 ? Math.trunc((random() * index) / 2) : null),
        ...defaultColumnValues,
      },
      length: 20,
    })
  );
  const [tableColumnExtensions] = useState([{ columnName: 'name', width: 300 }]);
  const [defaultExpandedRowIds] = useState([0]);

  return (
    <div className="card">
      <Grid rows={data} columns={columns}>
        <SelectionState />
        <TreeDataState defaultExpandedRowIds={defaultExpandedRowIds} />
        <CustomTreeData getChildRows={getChildRows} />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <TableTreeColumn for="name" showSelectionControls />
      </Grid>
    </div>
  );
};

export default { title: 'Demos|BasicSelection' };