import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Grid from '@mui/material/Grid'
import React, { useCallback, useState } from 'react'

import {IData} from '../interfaces/Data';
import { sortArray } from '../utils/sort';
import { SortEnum } from '../utils/sort'
import { DialogTop } from './DialogTop'
import {TableTop} from './TableTop'
const Main = () => {

  const [open, setOpen] = useState<boolean>(false);

  const handleChange = useCallback((e: SelectChangeEvent) => {
    setFilter(e.target.value);
    setRows(prev => prev.sort(sortArray(e.target.value as SortEnum)));
  }, []);
 
  const [rows, setRows] = useState<IData[]>([]);
  const [filter, setFilter] = useState('id');

  const addData = useCallback((data: IData) => {
    let newarr = [...rows, data];
    setRows(newarr.sort(sortArray(filter as SortEnum)));
  }, [filter, rows]);

  const openModal = useCallback(() => setOpen(prev => !prev), []);

  return (
    <>
      <Box p={4}>
      <Grid container sx={{justifyContent: 'flex-start'}}>
        <Grid item md={8}>
          <TableTop rows={rows}/>
        </Grid>
        <Grid item md={4}>
          <Box p={2}>
            <Grid container flexDirection={'row'}>
              <Button variant={'outlined'} onClick={openModal}>Добавить</Button>
              <FormControl  sx={{m: 1 ,minWidth: 130}}>
                <InputLabel>Сортировка</InputLabel>
                <Select
                  autoWidth
                  onChange={handleChange}
                  label="Сортировка"
                  value={filter}
                >
                  <MenuItem value={'id'}>По ID</MenuItem>
                  <MenuItem value={'position'}>По Position</MenuItem>
                  <MenuItem value={'relation'}>По Relation</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
          </Box>

        </Grid>
      </Grid>
    </Box>
    <DialogTop open={open} setOpen={setOpen} addData={addData} rows={rows}/>
    </>
  )
}

export default Main