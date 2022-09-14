export const truncateAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

interface Account {
  ensName?: string | null | undefined;
  id: string;
}
interface ENSAccount {
  ensName: string;
  id: string;
}

export const hasENS = (account: Account): account is ENSAccount => {
  return !!account.ensName;
};

export function normalizeAccount(account: Account): string {
  if (hasENS(account)) {
    return account.ensName;
  } else {
    return truncateAddress(account.id);
  }
}
