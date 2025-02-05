export const preloadLazyComponent = (lazyComponent: () => Promise<any>) => {
    lazyComponent(); // Trigger the import
  };