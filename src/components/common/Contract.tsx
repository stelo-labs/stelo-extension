type ContractProps = {
  address: string;
};

// Some ideas for things to display here:
// - Contract label - eg. Opensea, Uniswap (proprietary/scraped data from our backend)
// - Verified on etherscan?
// - Whitelisted? Blacklisted?
// - Reported as suspicious?
// - Contract age (ie. time since first deployed)
// - Num of contract interactions
// - Total value locked
// - Number of current SetApprovalForAll/Approve approvals

export const Contract = ({ address }: ContractProps) => {
  return (
    <div>
      <a href={`https://etherscan.io/address/${address}`}>
        View contract on etherscan
      </a>
    </div>
  );
};
