import * as React from "react";

const useMessage = () => {
  return React.useCallback((text: string) => {
    if (window.M && text) {
      window.M.toast({ html: text });
    }
  }, []);
};

export default useMessage;
