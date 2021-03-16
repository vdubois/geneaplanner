import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import React from "react";
import './FenetreDeSaisie.css';

export const FenetreDeSaisie = ({ouverte, fermer, individus}) => {
  return <Dialog
      open={ouverte}
      onClose={fermer}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Ajout d'une correction</DialogTitle>
      <DialogContent>
          <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
          </DialogContentText>
          <Autocomplete
              margin="dense"
              id="combo-box-demo"
              options={individus}
              getOptionLabel={individu => individu.nom}
              getOptionSelected={(option, value) => option.identifiant === value}
              noOptionsText="Aucun individu ne correspond"
              fullWidth
              clearText="Effacer"
              onChange={() => {}}
              renderInput={(params) => <TextField
                  {...params}
                  autoFocus
                  label="Individu concerné *"
                  variant="outlined"
              />}
          />
          <FormControl className="ChampFenetreDeSaisie" fullWidth>
              <InputLabel
                  id="demo-simple-select-label"
                  /*style={{
                      paddingLeft: '15px',
                      top: '-5px'
                  }}*/
              >Raison</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={() => {}}
                  variant="outlined"
                  value=""
                  MenuProps={
                      {
                          getContentAnchorEl: null,
                          anchorOrigin: {
                              vertical: 'bottom',
                              horizontal: 'left',
                          }
                      }
                  }
                  // style={{
                  //     paddingLeft: '6px'
                  // }}
              >
                  <MenuItem value="WRONG_ANCESTRY">Ascendance fausse</MenuItem>
                  <MenuItem value="WRONG_DESCENT">Descendance fausse</MenuItem>
                  <MenuItem value="WRONG_DATA">Donnée fausse</MenuItem>
                  <MenuItem value="MISSING_DATA">Donnée manquante</MenuItem>
              </Select>
          </FormControl>
          <FormControl className="ChampFenetreDeSaisie" fullWidth>
              <TextField
                  placeholder="Description"
                  multiline
                  rows={4}
                  rowsMax={4}
                  variant="outlined"
              />
          </FormControl>
      </DialogContent>
      <DialogActions>
          <Button
              onClick={fermer}
              color="primary"
              variant="text"
          >
              Annuler
          </Button>
          <Button
              onClick={fermer}
              color="primary"
              variant="contained"
              disabled
          >
              Enregistrer
          </Button>
      </DialogActions>
  </Dialog>;
};
