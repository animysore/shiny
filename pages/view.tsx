import * as React from 'react';
import Layout from '../src/components/Layout';
import Gallery from '../src/Gallery';

export default function View() {
  return (
    <Layout title="Shiny Collection" subtitle="View and share your NFTs">
      <div style={{ marginTop: 50 }}>
        <Gallery />
      </div>
    </Layout>
  );
}