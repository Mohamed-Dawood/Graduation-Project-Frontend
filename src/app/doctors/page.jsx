import Banner from '@/Components/BannerContent/Banner/BannerDoctor';
import { host } from '@/Components/utils/Host';

export default function Doctors() {
  return (
    <>
      <Banner host={`${host}/doctor/getAll`} />
    </>
  );
}
