import { IGlobalData } from 'interfaces';
import { Cards, Description } from './components';

interface Props {
  globalData: IGlobalData;
}

export default function Global({ globalData }: Props) {
  return (
    <div>
      <Description globalData={globalData} />
      <Cards globalData={globalData} />
    </div>
  );
}
