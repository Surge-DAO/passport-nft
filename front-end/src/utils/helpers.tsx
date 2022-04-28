export function errorHandler(e: any): string {
  if (e.error) {
    switch (e.error.code) {
      case 4001:
        return e.message;
      case -32603:
        return e.error.message;
      case -32000:
        return 'Unfortunately, you don\'t have enough funds to mint. Please make sure you have 0.08 ETH + some extra for gas.'
      case undefined:
        return 'An error occured, please try again.'
      default:
        return 'Your transaction did not go through. Please try again.'
    }
  } else {
    return 'Your transaction did not go through. Please try again.'
  }
};
