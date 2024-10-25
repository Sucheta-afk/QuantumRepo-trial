'use client';

const FuturisticBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 opacity-70 h-full w-full" />
        <style jsx>{`
          .bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            z-index: -1;
          }
        `}</style>
      </div>
    );
  };
  
  export default FuturisticBackground;
  