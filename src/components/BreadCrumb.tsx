import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import toright from '../../public/Images/toright.svg';
import { ProductData } from "@/components/product"; // Import the ProductData type
import { GetStaticPaths, GetStaticProps } from 'next';

interface HomeProps {
  products: ProductData[]; // Make sure the interface matches the expected prop
}

const Breadcrumb: React.FC<HomeProps> = ({ products }) => {
  const router = useRouter();
  const pathnames = router.asPath.split('/').filter((x) => x);

  const formatPageName = (name: string) => {
    // Replace hyphens with spaces and capitalize words
    return name.replace(/-/g, ' ').toUpperCase();
  };

  const selectedProduct = products.find((product) => product.id === parseInt(pathnames[pathnames.length - 1], 10));

  return (
    <div className="bg-[#1B2E3C] h-[240px] flex items-end justify-center text-[#F3E3E2] py-[20px]">
      <div className="flex gap-[72px] justify-center items-center flex-col">
        <h2 className="uppercase text-5xl">
          {selectedProduct ? formatPageName(selectedProduct.productName) : formatPageName(pathnames[pathnames.length - 1])}
        </h2>
        <div className="flex text-sm uppercase">
          <Link href="/">Home</Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <>
                <Image src={toright} alt="toright" height={20} width={20} />
                <span key={name}>{formatPageName(selectedProduct ? selectedProduct.productName : name)}</span>
              </>
            ) : (
              <>
                <Image src={toright} alt="toright" height={20} width={20} />{' '}
                <Link href={routeTo}>{formatPageName(name)}</Link>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Fetch your JSON data here, for example, using `import`
  const productData = await import('../../assets/productData.json');

  return {
    props: {
      products: productData.products as ProductData[], // Cast the products data to ProductData[]
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch your JSON data or use another data source to get the list of product IDs
  const productData = await import('../../assets/productData.json');
  const products = productData.products as ProductData[];

  // Create an array of product IDs for the dynamic paths
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: false, // Set to 'true' or 'blocking' if you want to enable fallback behavior
  };
};

export default Breadcrumb;