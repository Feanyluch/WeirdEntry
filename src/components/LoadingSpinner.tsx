// components/GlobalLoading.tsx
// import LoadingSpinner from './LoadingSpinner';

const GlobalLoading = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(255, 255, 255, 0.8)' }} className="z-[999999]">
      <h2 className="font-bold z-[99999999]">Loading...</h2>
    </div>
  );
};

export default GlobalLoading;
