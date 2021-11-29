import { Avatar, Button, Chip, Link } from '@mui/material';
import * as React from 'react';
import { useNEAR } from '../near/WithNear';

export default function Header() {
  const { accountId, login, logout } = useNEAR();
  return (
    <header>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        {accountId ? (
          <>
            <Link href='/' style={{ marginRight: 10 }}> Home </Link>
            <Link href='/view'> Collection </Link>
            <Chip style={{ marginLeft: 'auto' }} avatar={<Avatar>N</Avatar>} label={accountId} />
            <Button variant="text" onClick={() => logout()}> Logout </Button>
          </>
        ) : (
          <Button variant="text" onClick={() => login()}> Login with NEAR Wallet </Button>
        )}
      </div>
    </header>
  ); 
}