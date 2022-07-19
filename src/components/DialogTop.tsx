import {useQuery} from '@apollo/client';
import { FormControl, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import * as React from 'react';

import { useInput } from '../hooks/useInput';
import { IData } from '../interfaces/Data';
import { IPosition, IRelation } from '../interfaces/Graph';
import { GET_POSITIONS } from '../query/position';
import { GET_RELATIONS } from '../query/relation';

interface DialogProps {
    open: boolean
    setOpen: Function
    addData: (data: IData) => void
    rows: IData[]
}

export const DialogTop: React.FC<DialogProps> = ({open, setOpen, addData, rows}) => {

  const {data: relations, loading: loadingRelatons} = useQuery(GET_RELATIONS);
  const {data: positions, loading: loadingPositions} = useQuery(GET_POSITIONS);

  const handleClose = () => {
    setOpen(false);
  };

  const validateId = (value: number) => {
    return value < 1 || value > 99000 || rows.findIndex(row => row.clientId == value) != -1
  }

  const [clientId, clearId] = useInput(0, validateId);
  const [firstName, clearFirstName] = useInput('');
  const [lastName, clearLastName] = useInput('');
  const [companyName, clearCompanyName] = useInput('');
  const [relation, clearRelation] = useInput('');
  const [position, clearPosition] = useInput('');

  const dataRow: IData = {
    clientId: clientId.value as number,
    firstName: firstName.value as string,
    lastName: lastName.value as string,
    companyName: companyName.value as string,
    relation: relation.value as string,
    position: position.value as string
  }

  const handleAdd = () => {
    if (validateForm())
      {return;}

    addData(dataRow);
    clearFields();
    setOpen(false);
  }

  const clearFields = () => {
    clearId();
    clearFirstName();
    clearLastName();
    clearCompanyName();
    clearRelation();
    clearPosition();
  }

  const validateForm = () => {
    return clientId.error ||
    firstName.error ||
    lastName.error ||
    companyName.error||
    relation.error ||
    position.error ? true : false;
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавление</DialogTitle>
        <DialogContent>
          <TextField
            type={"number"}
            autoFocus
            margin="dense"
            label="Client ID"
            fullWidth
            required
            variant="standard"
            {...clientId}
          />
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            fullWidth
            required
            variant="standard"
            {...firstName}
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            variant="standard"
            {...lastName}
          />
          <TextField
            margin="dense"
            label="Company Name"
            type="text"
            fullWidth
            variant="standard"
            {...companyName}
          />
          {
            loadingRelatons || loadingPositions ? <div>Ждите...</div>
            :
            <>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Relation</InputLabel>
                <Select
                    label="Relation"
                    value={(relation.value || '') as string}
                    onChange={relation.onChange}
                    error={relation.error}
                >
                    {
                      relations?.applicantIndividualCompanyRelations.data.map((el:IRelation) => (
                        <MenuItem key={el.id} value={el.name}>{el.name}</MenuItem>
                        )
                      )
                    }
                  </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Position</InputLabel>
                <Select
                    value={(position.value || '') as string}
                    onChange={position.onChange}
                    label="Position"
                    error={position.error}
                  >
                    {
                      positions?.applicantIndividualCompanyPositions.data.map((el:IPosition) => (
                        <MenuItem key={el.id} value={el.name}>{el.name}</MenuItem>
                        )
                      )
                    }
                  </Select>
              </FormControl> 
            </>
              
          }
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleAdd}>Добавить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}