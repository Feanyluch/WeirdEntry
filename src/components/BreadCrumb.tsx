import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import toright from '../../public/Images/toright.svg';

const Breadcrumb = () => {
  const router = useRouter();
  const pathnames = router.asPath.split('/').filter((x) => x);

  const formatPageName = (name: string) => {
    // Replace hyphens with spaces and capitalize words
    return name.replace(/-/g, ' ').toUpperCase();
  };

  return (
    <div className="bg-[#1B2E3C] h-[299px] flex items-center justify-center text-[#F3E3E2]">
      <div className="flex justify-between items-center flex-col">
        <h2 className="uppercase text-5xl">
          {formatPageName(pathnames[pathnames.length - 1])}
        </h2>
        <div className="flex mt-32 text-lg uppercase">
          <Link href="/">Home</Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <>
                <Image src={toright} alt="toright" />
                <span key={name}>{formatPageName(name)}</span>
              </>
            ) : (
              <>
                <Image src={toright} alt="toright" />{' '}
                <Link href={routeTo}>{formatPageName(name)}</Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
