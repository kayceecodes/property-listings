import React from 'react'
import TextField from "@material-ui/core/TextField/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import Toolbar from '@material-ui/core/Toolbar';

/* 
    Why is intersect conforming to a single type
    
*/

export function LittleSearchBox() {
    return (
        <Toolbar>
        <div style={{ width: 300 }}>
          <Autocomplete
          
            onChange={(event: any, value: any) => {
                event;
                console.log(value);
            }}
            id="free-solo-demo"
            freeSolo
            options={['first', 'second', 'third']}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                id="outlined-size-small"
                label="Search Bracelets"
                margin="normal"
                color={undefined}
              />
            )}
          />
        </div>
      </Toolbar>   
    )
}
