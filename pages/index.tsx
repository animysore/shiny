import * as React from 'react';
import Main from '../src/Main';
import Layout from '../src/components/Layout';

export default function Index() {

  return (
    <Layout>
      <div style={{ marginTop: 50 }}>
        <Main />
      </div>
    </Layout>
  );
}
