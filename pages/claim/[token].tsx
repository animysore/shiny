import * as React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/components/Layout';
import ClaimView from '../../src/ClaimView';

export default function Claim() {
  const router = useRouter();
  const id = router.query.token;

  return (
    <Layout title="Shiny Claims" subtitle="Claim this NFT">
      <ClaimView claimId={id as string} />      
    </Layout>
  );
}