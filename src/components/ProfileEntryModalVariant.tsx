import React, {FC} from 'react';
import {Button, FormControl, FormHelperText, Stack, TextField, Typography} from "@mui/material";

interface ProfileEntryModalVariantProps {
  title: string,
  successHandler: () => void,
  username: string,
  password: string,
  usernameHandler: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  passwordHandler: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  helperText: string,
  error: boolean
}

const ProfileEntryModalVariant: FC<ProfileEntryModalVariantProps> = ({
  title,
  successHandler,
  username,
  password,
  usernameHandler,
  passwordHandler,
  helperText,
  error
}) => {
  return (
    <Stack spacing={2}>
      <Typography variant={'h1'}>{title}</Typography>
      <TextField label="Username" variant="outlined" onChange={usernameHandler} value={username} />
      <TextField label="Password" variant="outlined" onChange={passwordHandler} value={password} />
      <Button variant="contained" color="success" onClick={successHandler}>{title}</Button>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default ProfileEntryModalVariant;