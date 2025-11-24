import { useState } from 'react';

export default function Tooltip({ children, content, position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>

      {isVisible && content && (
        <div
          className={`absolute z-50 ${positionClasses[position]} w-64 pointer-events-none`}
          role="tooltip"
        >
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
            {content}
            <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
              position === 'top' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1' :
              position === 'bottom' ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1' :
              position === 'left' ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1' :
              'left-0 top-1/2 -translate-y-1/2 -translate-x-1'
            }`} />
          </div>
        </div>
      )}
    </div>
  );
}
