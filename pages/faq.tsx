import * as React from 'react';
import FAQText from '../src/components/FAQText';
import Layout from '../src/components/Layout';

export default function View() {
  return (
    <Layout title="Shiny?" subtitle="Frequently Asked Questions (assumed)">
      <div style={{ marginTop: 50 }}>
        <FAQText />
      </div>
    </Layout>
  );
}