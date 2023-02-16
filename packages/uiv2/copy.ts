export const copy = {
  verbs: {
    approve: "Approving access to",
    revoke: "Revoking access to",
    offer: "Offering",
    for: "For",
    send: "Sending",
    receive: "Receiving",
  },

  royalty_table: {
    platformFee: "Platform receives",
    creatorFee: "Creator receives",
    expires: "Listing expires",
  },
  signature: {
    multisigDisclaimer:
      "This is a gnosis-safe transaction. This will require other parties to sign before executing.",
    disclaimer:
      "This is a gasless signature. Signing this message may not result in immediate changes.",
  },
} as const;
