import React, { useRef, useState, useContext } from 'react';
import { Schema, Plugin, BasePdf, SchemaForUI, ChangeSchemas } from '@pdfme/common';
import { theme, Button } from 'antd';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Renderer from 'src/components/Renderer';
import { PluginsRegistry } from 'src/contexts';
import ListView from './ListView';
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
  padding: '1rem',
  background: 'lightblue',
};

const buttonStyle: React.CSSProperties = {
  border: ' 1px dashed rgba(8, 140, 97, 1)',
  fontSize: '12px',
  color: '#088c61',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  lineHeight: '133%',
  background: 'white',
  height: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
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

interface TabComponentProps {
  getActiveSchemas: unknown;
  getLastActiveSchema: unknown;
  props: {
    onChangeHoveringSchemaId: (id: string | null) => void;
    activeElements: HTMLElement[];
    schemas: SchemaForUI[];
    onEdit: (id: string) => void;
    onEditEnd: () => void;
    changeSchemas: ChangeSchemas;
    sidebarOpen: boolean;
    setSidebarOpen: (sidebarOpen: boolean) => void;
    basePdf: BasePdf;
    scale: number;
  };
}

const TabComponent: React.FC<TabComponentProps> = ({
  props,
  getActiveSchemas,
  getLastActiveSchema,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const pluginsRegistry = useContext(PluginsRegistry);

  return (
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
            {/* {Object.entries(pluginsRegistry).map(([label, plugin]) => {
              if (!plugin?.propPanel.defaultSchema) return null;
              return (
                <Draggable key={label} scale={props.scale} basePdf={props.basePdf} plugin={plugin}>
                  <button title={label} style={buttonStyle}>
                    {plugin.propPanel.defaultSchema ? (
                      // <div
                      //   dangerouslySetInnerHTML={{ __html: plugin.propPanel.defaultSchema.icon }}
                      // />
                      <div>{label}</div>
                    ) : (
                      <div
                      // style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                      >
                        {label}
                      </div>
                    )}
                  </button>
                </Draggable>
              );
            })} */}
          </div>
        )}
        {/* {activeTab === 1 && <ListView {...props} />}

        {activeTab === 2 && (
          <div>
            {getActiveSchemas().length !== 0 && (
              <DetailView {...props} activeSchema={getLastActiveSchema()} />
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TabComponent;
