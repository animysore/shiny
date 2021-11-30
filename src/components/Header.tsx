import { Avatar, Button, Chip, Link } from '@mui/material';
import * as React from 'react';
import { useNEAR } from '../near/WithNear';

export default function Header() {
  const { accountId, login, logout } = useNEAR();
  return (
    <header style={{ marginBottom: 30 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        {accountId ? (
          <>
            <Link href='/' style={{ marginRight: 10 }}> Mint </Link>
            <Link href='/view' style={{ marginRight: 10 }}> Collection </Link>
            <Link href='/faq'> FAQ</Link>
            <Chip style={{ marginLeft: 'auto' }} avatar={<Avatar>N</Avatar>} label={accountId} />
            <Button variant="text" onClick={() => logout()}> Logout </Button>
          </>
        ) : (
          <Button variant="text" onClick={() => login()}> Connect NEAR Wallet </Button>
        )}
      </div>
    </header>
  ); 
}