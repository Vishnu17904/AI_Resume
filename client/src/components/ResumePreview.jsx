import React from 'react';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalImageTemplate from './templates/MinimalImageTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className='w-full bg-white'>
      <div id='resume-preview' className={`border border-gray-200 print:border-none print:shadow-none bg-white ${classes}`}>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
