import Cookies from 'js-cookie';

export const getDevPasswordAccepted = () => {
  const devPasswordAccepted = Cookies.get('devPasswordAccepted');
  if(devPasswordAccepted) {
    return devPasswordAccepted;
  }
  return false;
}
