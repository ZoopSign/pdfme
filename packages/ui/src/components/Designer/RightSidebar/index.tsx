import React, { useContext, useEffect, useState } from 'react';
import { Button, theme } from 'antd';
import type { SidebarProps } from '../../../types';
import { RIGHT_SIDEBAR_WIDTH } from '../../../constants';
import { ArrowLeftOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ListView from './ListView/index';
import { Schema, Plugin, BasePdf } from '@pdfme/common';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Renderer from 'src/components/Renderer';
import { PluginsRegistry } from 'src/contexts';
import DetailView from './DetailView';

const tabContainerStyle: React.CSSProperties = {
  display: 'flex',
  borderBottom: '1px solid #DBDBDB',
  marginBottom: '1rem',
};

const tabStyle = (isActive: boolean): React.CSSProperties => ({
  padding: '0.5rem 1rem',
  width: '100%',
  textAlign: 'center',
  cursor: 'pointer',
  borderBottom: isActive ? '2px solid #6B52AD' : '2px solid transparent',
  color: isActive ? '#6B52AD' : '#8E8E8E',
  fontWeight: isActive ? 'bold' : 'normal',
});

const contentStyle: React.CSSProperties = {
  padding: '16px',
};

const buttonStyle: React.CSSProperties = {
  border: ' 1px dashed #6B52AD',
  fontSize: '14px',
  color: '#6B52AD',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  lineHeight: '133%',
  background: 'white',
  height: '35px',
  width: '100%',
  cursor: 'pointer',
  textAlign: 'left',
  padding: '0px 12px',
};

const Draggable = (props: {
  plugin: Plugin<any>;
  scale: number;
  basePdf: BasePdf;
  children: React.ReactNode;
}) => {
  const { scale, basePdf, plugin } = props;
  const { token } = theme.useToken();
  const defaultSchema = plugin.propPanel.defaultSchema as Schema;
  const draggable = useDraggable({ id: defaultSchema.type, data: defaultSchema });
  const { listeners, setNodeRef, attributes, transform, isDragging } = draggable;
  const style = { transform: CSS.Translate.toString(transform) };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {isDragging && (
        <div style={{ transform: `scale(${scale})` }}>
          <Renderer
            key={defaultSchema.type}
            schema={{ ...defaultSchema, id: defaultSchema.type, key: defaultSchema.type }}
            basePdf={basePdf}
            value={defaultSchema.content || ''}
            onChangeHoveringSchemaId={() => {
              void 0;
            }}
            mode={'viewer'}
            outline={`1px solid ${token.colorPrimary}`}
            scale={scale}
          />
        </div>
      )}
      <div style={{ visibility: isDragging ? 'hidden' : 'visible' }}>{props.children}</div>
    </div>
  );
};

const Sidebar = (props: SidebarProps) => {
  const { sidebarOpen, setSidebarOpen, scale, basePdf, activeElements, schemas } = props;
  const [activeTab, setActiveTab] = useState<number>(1);
  const pluginsRegistry = useContext(PluginsRegistry);

  const getActiveSchemas = () =>
    schemas.filter((s) => activeElements.map((ae) => ae.id).includes(s.id));

  const getLastActiveSchema = () => {
    const activeSchemas = getActiveSchemas();
    return activeSchemas[activeSchemas.length - 1];
  };

  useEffect(() => {
    if (activeElements.length > 0) {
      setActiveTab(2);
    } else {
      setActiveTab(0);
    }
  }, [activeElements]);

  return (
    <div
      style={{
        width: RIGHT_SIDEBAR_WIDTH,
        height: '100%',
        display: sidebarOpen ? 'block' : 'none',
        top: 0,
        right: 0,
        position: 'absolute',
        padding: '0.4rem 1rem',
        overflowY: 'auto',
        fontFamily: "'Open Sans', sans-serif",
        boxSizing: 'border-box',
        background: 'white',
        borderLeft: '1px solid #DBDBDB',
      }}
    >
      <div>
        <div style={tabContainerStyle}>
          <div style={tabStyle(activeTab === 0)} onClick={() => setActiveTab(0)}>
            Component
          </div>
          <div style={tabStyle(activeTab === 1)} onClick={() => setActiveTab(1)}>
            Layer
          </div>

          <div style={tabStyle(activeTab === 2)} onClick={() => setActiveTab(2)}>
            Fields
          </div>
        </div>
        <div style={contentStyle}>
          {activeTab === 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '10px',
              }}
            >
              {Object.entries(pluginsRegistry).map(([label, plugin]) => {
                if (!plugin?.propPanel.defaultSchema) return null;
                return (
                  <Draggable key={label} scale={scale} basePdf={basePdf} plugin={plugin}>
                    <button title={label} style={buttonStyle}>
                      {plugin.propPanel.defaultSchema && <>{label}</>}
                    </button>
                  </Draggable>
                );
              })}
            </div>
          )}
          {activeTab === 1 && <ListView {...props} />}

          {activeTab === 2 && (
            <div>
              {getActiveSchemas().length !== 0 ? (
                <DetailView {...props} activeSchema={getLastActiveSchema()} />
              ) : (
                <div>No element selected.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// const Draggable = (props: {
//   plugin: Plugin<any>;
//   scale: number;
//   basePdf: BasePdf;
//   children: React.ReactNode;
// }) => {
//   const { scale, basePdf, plugin } = props;
//   const { token } = theme.useToken();
//   const defaultSchema = plugin.propPanel.defaultSchema as Schema;
//   const draggable = useDraggable({ id: defaultSchema.type, data: defaultSchema });
//   const { listeners, setNodeRef, attributes, transform, isDragging } = draggable;
//   const style = { transform: CSS.Translate.toString(transform) };

//   return (
//     <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
//       {isDragging && (
//         <div style={{ transform: `scale(${scale})` }}>
//           <Renderer
//             key={defaultSchema.type}
//             schema={{ ...defaultSchema, id: defaultSchema.type, key: defaultSchema.type }}
//             basePdf={basePdf}
//             value={defaultSchema.content || ''}
//             onChangeHoveringSchemaId={() => {
//               void 0;
//             }}
//             mode={'viewer'}
//             outline={`1px solid ${token.colorPrimary}`}
//             scale={scale}
//           />
//         </div>
//       )}
//       <div className={isDragging ? 'invisible' : 'visible'}>{props.children}</div>
//     </div>
//   );
// };

// const Sidebar = (props: SidebarProps) => {
//   const { sidebarOpen, setSidebarOpen, scale, basePdf, activeElements, schemas } = props;
//   const [activeTab, setActiveTab] = useState<number>(1);
//   const pluginsRegistry = useContext(PluginsRegistry);

//   const getActiveSchemas = () =>
//     schemas.filter((s) => activeElements.map((ae) => ae.id).includes(s.id));

//   const getLastActiveSchema = () => {
//     const activeSchemas = getActiveSchemas();
//     return activeSchemas[activeSchemas.length - 1];
//   };

//   useEffect(() => {
//     if (activeElements.length > 0) {
//       setActiveTab(2);
//     } else {
//       setActiveTab(0);
//     }
//   }, [activeElements]);

//   return (
//     <div
//       className={`${
//         sidebarOpen ? 'block' : 'hidden'
//       } absolute top-0 right-0 h-full p-4 overflow-y-auto bg-white border-l border-gray-300`}
//       style={{ width: RIGHT_SIDEBAR_WIDTH }}
//     >
//       <div>
//         <div className="flex border-b border-gray-300 mb-4">
//           <div
//             className={`w-full text-center cursor-pointer py-2 ${
//               activeTab === 0 ? 'border-b-2 border-purple-600 text-purple-600 font-bold' : 'border-b-2 border-transparent text-gray-600'
//             }`}
//             onClick={() => setActiveTab(0)}
//           >
//             Component
//           </div>
//           <div
//             className={`w-full text-center cursor-pointer py-2 ${
//               activeTab === 1 ? 'border-b-2 border-purple-600 text-purple-600 font-bold' : 'border-b-2 border-transparent text-gray-600'
//             }`}
//             onClick={() => setActiveTab(1)}
//           >
//             Layer
//           </div>
//           <div
//             className={`w-full text-center cursor-pointer py-2 ${
//               activeTab === 2 ? 'border-b-2 border-purple-600 text-purple-600 font-bold' : 'border-b-2 border-transparent text-gray-600'
//             }`}
//             onClick={() => setActiveTab(2)}
//           >
//             Fields
//           </div>
//         </div>
//         <div className="p-4">
//           {activeTab === 0 && (
//             <div className="grid grid-cols-2 gap-2">
//               {Object.entries(pluginsRegistry).map(([label, plugin]) => {
//                 if (!plugin?.propPanel.defaultSchema) return null;
//                 return (
//                   <Draggable key={label} scale={scale} basePdf={basePdf} plugin={plugin}>
//                     <button
//                       title={label}
//                       className="w-full p-2 border-dashed border-2 border-purple-600 text-purple-600 font-bold text-left whitespace-nowrap bg-white cursor-pointer"
//                     >
//                       {plugin.propPanel.defaultSchema && <>{label}</>}
//                     </button>
//                   </Draggable>
//                 );
//               })}
//             </div>
//           )}
//           {activeTab === 1 && <ListView {...props} />}
//           {activeTab === 2 && (
//             <div>
//               {getActiveSchemas().length !== 0 ? (
//                 <DetailView {...props} activeSchema={getLastActiveSchema()} />
//               ) : (
//                 <div>Nothing is selected from layers</div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
