import { Cards, Description } from './components';
import { GlobalProps } from './interface';

export default function Global(props: GlobalProps) {
  const { globalData } = props;

  return (
    <div>
      <Description globalData={globalData} />
      <Cards globalData={globalData} />
    </div>
  );
}
