import styled, { ThemeConsumer } from 'styled-components';
import { Add, TrashCan } from '@carbon/react/icons';
import { useState } from 'react';
import * as R from 'ramda';

export const Title = ({ children }) => {
  return (
    <h1
      style={{
        fontFamily:
          '"Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: '32px',
        fontWeight: '900',
        margin: '20px 0 8px',
        color: '#333333'
      }}
    >
      {children}
    </h1>
  );
};

export const SubTitle = ({ children }) => {
  return (
    <h1
      style={{
        fontFamily:
          '"Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: '24px',
        fontWeight: '900',
        margin: '30px 0 8px',
        borderTop: '5px solid #999999',
        paddingTop: '0.5rem',
        color: '#333333'
      }}
    >
      {children}
    </h1>
  );
};

export const P = ({ children }) => {
  return <p style={{ marginTop: '0.5rem' }}>{children}</p>;
};

export const Row = ({ children, title, value, description }) => {
  return (
    <div
      style={{
        marginTop: '1rem',
        display: 'flex',
        borderTop: '1px solid #666666',
        paddingTop: '1rem'
      }}
    >
      <div>{children}</div>
      <div style={{ marginLeft: '2rem' }}>
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div style={{ fontSize: '80%' }}>
          {typeof value === 'object' &&
            Object.entries(value).map(([k, v]) => {
              return (
                <div key={k}>
                  {k}: {JSON.stringify(v)}
                </div>
              );
            })}
          {typeof value !== 'object' && <>{value}</>}
        </div>
        <div style={{ marginTop: '1rem' }}>{description}</div>
      </div>
    </div>
  );
};

export const Stack = ({ spacing, description }) => {
  return (
    <ThemeConsumer>
      {theme => (
        <Row
          title={`spacing.stack.${spacing}`}
          value={theme.spacing.stack[spacing]}
          description={description}
        >
          <div
            style={{
              width: '15rem',
              backgroundColor: 'pink'
            }}
          >
            <div
              style={{
                width: '15rem',
                height: '3rem',
                backgroundColor: 'hotpink',
                marginBottom: theme.spacing.stack[spacing]
              }}
            ></div>

            <div
              style={{
                backgroundColor: 'hotpink',
                width: '15rem',
                height: '3rem'
              }}
            ></div>
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const Inline = ({ spacing, description }) => {
  return (
    <ThemeConsumer>
      {theme => (
        <Row
          title={`spacing.inline.${spacing}`}
          value={theme.spacing.inline[spacing]}
          description={description}
        >
          <div
            style={{
              width: '15rem',
              backgroundColor: 'pink',
              display: 'flex'
            }}
          >
            <div
              style={{
                width: '15rem',
                height: '6rem',
                backgroundColor: 'hotpink',
                marginRight: theme.spacing.inline[spacing]
              }}
            ></div>

            <div
              style={{
                backgroundColor: 'hotpink',
                width: '15rem',
                height: '6rem'
              }}
            ></div>
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const Inset = ({ path, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row
          title={`spacing.${p.join('.')}`}
          value={R.path(p, theme.spacing)}
          description={description}
        >
          <div
            style={{
              width: '15rem',
              backgroundColor: 'pink',
              display: 'flex',
              padding: R.path(p, theme.spacing)
            }}
          >
            <div
              style={{
                width: '100%',
                height: '3rem',
                backgroundColor: 'hotpink'
              }}
            ></div>
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const Font = ({ path, description, text }) => {
  const p = path.split('.');
  const name = p.join('_');

  return (
    <ThemeConsumer>
      {theme => {
        const base = R.path(p, theme.typography);
        const fontBlock = f => {
          return `
            ${f.lineHeight ? `line-height: ${f.lineHeight};` : ''}
            ${f.size ? `font-size: ${f.size};` : ''}
            ${f.weight ? `font-weight: ${f.weight};` : ''}
            ${f.letterSpacing ? `letter-spacing: ${f.letterSpacing};` : ''}
          `;
        };
        return (
          <Row title={`typography.${path}`} value={base} description={description}>
            <style scoped>{`
              .fontSample_${name} {
                width: 50vw;
                font-family: ${base.family};
                font-size: ${base.size};
                font-weight: ${base.weight};
                line-height: ${base.lineHeight};
                letter-spacing: ${base.letterSpacing};
                font-style: ${base.style};
              }
              ${
                !base.breakpoints?.small
                  ? ''
                  : `
                @media (min-width: ${theme.breakpoints['small']}) {
                  .fontSample_${name} {
                  ${fontBlock(base.breakpoints?.small)}
                  }
                }
              `
              }
              ${
                !base.breakpoints?.medium
                  ? ''
                  : `
                @media (min-width: ${theme.breakpoints['medium']}) {
                  .fontSample_${name} {
                  ${fontBlock(base.breakpoints?.medium)}
                  }
                }
              `
              }
              ${
                !base.breakpoints?.large
                  ? ''
                  : `
                @media (min-width: ${theme.breakpoints['large']}) {
                  .fontSample_${name} {
                  ${fontBlock(base.breakpoints?.large)}
                  }
                }
              `
              }
              ${
                !base.breakpoints?.xLarge
                  ? ''
                  : `
                @media (min-width: ${theme.breakpoints['xLarge']}) {
                  .fontSample_${name} {
                  ${fontBlock(base.breakpoints?.xLarge)}
                  }
                }
              `
              }
              ${
                !base.breakpoints?.max
                  ? ''
                  : `
                @media (min-width: ${theme.breakpoints['max']}) {
                  .fontSample_${name} {
                  ${fontBlock(base.breakpoints?.max)}
                  }
                }
              `
              }
            `}</style>
            <div className={`fontSample_${name}`}>
              {text === 'lipsum' && (
                <>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum suscipit
                  tortor non tincidunt. Aliquam lectus libero, feugiat in mauris non, rutrum porta
                  ante. Morbi at pretium turpis. In eu tincidunt nunc. Vivamus ut risus ultrices,
                  varius velit vel, mollis magna. Nullam scelerisque laoreet nisi, at porta dolor
                  congue ac. Vestibulum sit amet ante ac nisl posuere tempor.{' '}
                </>
              )}
              {text !== 'lipsum' && <>The quick brown fox jumps over the lazy dog</>}
            </div>
          </Row>
        );
      }}
    </ThemeConsumer>
  );
};

export const Color = ({ path, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={`colors.${path}`} value={R.path(p, theme.colors)} description={description}>
          <div
            style={{
              width: '15rem',
              height: '3rem',
              backgroundColor: R.path(p, theme.colors)
            }}
          ></div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const InteractiveColor = ({ path, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={`colors.${path}`} value={R.path(p, theme.colors)} description={description}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '15rem',
                height: '3rem',
                padding: '0.5rem',
                backgroundColor: R.path(p, theme.colors).base.bg,
                color: R.path(p, theme.colors).base.fg
              }}
            >
              base.fg / base.bg
            </div>
            <div
              style={{
                width: '15rem',
                height: '3rem',
                padding: '0.5rem',
                backgroundColor: R.path(p, theme.colors).hover.bg,
                color: R.path(p, theme.colors).hover.fg
              }}
            >
              hover.fg / hover.bg
            </div>
            <div
              style={{
                width: '15rem',
                height: '3rem',
                padding: '0.5rem',
                backgroundColor: R.path(p, theme.colors).active.bg,
                color: R.path(p, theme.colors).active.fg
              }}
            >
              active.fg / active.bg
            </div>
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const ColorPair = ({ path, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={`colors.${path}`} value={R.path(p, theme.colors)} description={description}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '15rem',
                height: '3rem',
                padding: '0.5rem',
                backgroundColor: R.path(p, theme.colors).bg,
                color: R.path(p, theme.colors).fg
              }}
            >
              fg / bg
            </div>
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const ColorPairContrast = ({ path, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={`colors.${path}`} value={R.path(p, theme.colors)} description={description}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '15rem',
                height: '3rem',
                padding: '0.5rem',
                backgroundColor: R.path(p, theme.colors).base,
                color: R.path(p, theme.colors).contrast
              }}
            >
              contrast / base
            </div>

            <div
              style={{
                width: '15rem',
                height: '3rem',
                padding: '0.5rem',
                backgroundColor: R.path(p, theme.colors).contrast,
                color: R.path(p, theme.colors).base
              }}
            >
              base / contrast
            </div>
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const TextColor = ({ path, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={`colors.${path}`} value={R.path(p, theme.colors)} description={description}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '15rem',
                height: '4rem',
                padding: '0.5rem',
                backgroundColor: theme.colors.backgrounds.page,
                color: R.path(p, theme.colors)
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
            <div
              style={{
                width: '10rem',
                height: '4rem',
                padding: '0.5rem',
                backgroundColor: theme.colors.backgrounds.panels.primary.base,
                color: R.path(p, theme.colors)
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
            <div
              style={{
                width: '10rem',
                height: '4rem',
                padding: '0.5rem',
                backgroundColor: theme.colors.backgrounds.panels.secondary.base,
                color: R.path(p, theme.colors)
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
            <div
              style={{
                width: '10rem',
                height: '4rem',
                padding: '0.5rem',
                backgroundColor: theme.colors.backgrounds.panels.tertiary.base,
                color: R.path(p, theme.colors)
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const DelimiterColor = ({ path, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={`colors.${path}`} value={R.path(p, theme.colors)} description={description}>
          <div
            style={{
              width: '15rem',
              height: '3rem',
              padding: '0.5rem',
              color: R.path(p, theme.colors)
            }}
          >
            <div
              style={{
                borderTop: `1px solid ${R.path(p, theme.colors)}`,
                marginTop: '1rem',
                width: '100%'
              }}
            />
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const IconColor = ({ path, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={`colors.${path}`} value={R.path(p, theme.colors)} description={description}>
          <div
            style={{
              width: '15rem',
              height: '3rem',
              padding: '0.5rem',
              color: R.path(p, theme.colors)
            }}
          >
            <Add size={16} />
            <TrashCan size={16} />
            <Add size={32} />
            <TrashCan size={32} />
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const PanelColor = ({ path, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={`colors.${path}`} value={R.path(p, theme.colors)} description={description}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '11.25rem',
                height: '3rem',
                padding: '0.5rem',
                backgroundColor: R.path(p, theme.colors).base
              }}
            >
              base
            </div>
            <div
              style={{
                width: '11.25rem',
                height: '3rem',
                padding: '0.5rem',
                backgroundColor: R.path(p, theme.colors).hover
              }}
            >
              hover
            </div>
            <div
              style={{
                width: '11.25rem',
                height: '3rem',
                padding: '0.5rem',
                backgroundColor: R.path(p, theme.colors).selected
              }}
            >
              selected
            </div>
            <div
              style={{
                width: '11.25rem',
                height: '3rem',
                padding: '0.5rem',
                backgroundColor: R.path(p, theme.colors).selected_hover
              }}
            >
              selected_hover
            </div>
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const Elevation = ({ path, background, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={path} value={R.path(p, theme)} description={description}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div
              style={{
                backgroundColor: R.path(background.split('.'), theme),
                width: '15rem',
                height: '3rem',
                boxShadow: R.path(p, theme).base
              }}
            ></div>

            <div
              style={{
                backgroundColor: R.path(background.split('.'), theme),
                width: '15rem',
                height: '3rem',
                boxShadow: R.path(p, theme).hover
              }}
            ></div>
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const Border = ({ path, background, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={path} value={R.path(p, theme)} description={description}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div
              style={{
                backgroundColor: R.path(background.split('.'), theme),
                width: '15rem',
                height: '3rem',
                border: R.path(p, theme)?.base?.border,
                borderRadius: R.path(p, theme)?.base?.radius
              }}
            ></div>
            <div
              style={{
                backgroundColor: R.path(background.split('.'), theme),
                width: '15rem',
                height: '3rem',
                border: R.path(p, theme)?.hover?.border,
                borderRadius: R.path(p, theme)?.hover?.radius
              }}
            ></div>
          </div>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const Breakpoints = ({}) => {
  return (
    <ThemeConsumer>
      {theme => (
        <div>
          <div
            style={{
              backgroundColor: '#666666',
              height: '2rem',
              color: '#ffffff',
              paddingTop: '0.5rem',
              paddingLeft: '0.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              width: theme.breakpoints.small
            }}
          >
            Small
          </div>
          <div
            style={{
              backgroundColor: '#666666',
              height: '2rem',
              color: '#ffffff',
              paddingTop: '0.5rem',
              paddingLeft: '0.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              width: theme.breakpoints.medium
            }}
          >
            Medium
          </div>
          <div
            style={{
              backgroundColor: '#666666',
              height: '2rem',
              color: '#ffffff',
              paddingTop: '0.5rem',
              paddingLeft: '0.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              width: theme.breakpoints.large
            }}
          >
            Large
          </div>
          <div
            style={{
              backgroundColor: '#666666',
              height: '2rem',
              color: '#ffffff',
              paddingTop: '0.5rem',
              paddingLeft: '0.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              width: theme.breakpoints.xLarge
            }}
          >
            xLarge
          </div>
          <div
            style={{
              backgroundColor: '#666666',
              height: '2rem',
              color: '#ffffff',
              paddingTop: '0.5rem',
              paddingLeft: '0.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              width: theme.breakpoints.max
            }}
          >
            max
          </div>
        </div>
      )}
    </ThemeConsumer>
  );
};

export const MotionEntry = ({ path, description }) => {
  const p = path.split('.');
  const [state, setState] = useState(true);
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={path} value={R.path(p, theme)} description={description}>
          {state && (
            <div
              style={{
                backgroundColor: theme.colors.brand.brand1.base,
                width: '15rem',
                height: '3rem',
                animation: R.path(p, theme)
              }}
            ></div>
          )}
          {!state && (
            <div
              style={{
                backgroundColor: 'none',
                width: '15rem',
                height: '3rem'
              }}
            ></div>
          )}
          <button onClick={() => setState(false)}>Reset</button>
          <button onClick={() => setState(true)}>Start</button>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const MotionExit = ({ path, description }) => {
  const p = path.split('.');
  const [state, setState] = useState(true);
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={path} value={R.path(p, theme)} description={description}>
          {state && (
            <div
              style={{
                backgroundColor: theme.colors.brand.brand1.base,
                width: '15rem',
                height: '3rem',
                animation: R.path(p, theme),
                opacity: '0'
              }}
            ></div>
          )}
          {!state && (
            <div
              style={{
                backgroundColor: theme.colors.brand.brand1.base,
                width: '15rem',
                height: '3rem'
              }}
            ></div>
          )}
          <button onClick={() => setState(false)}>Reset</button>
          <button onClick={() => setState(true)}>Start</button>
        </Row>
      )}
    </ThemeConsumer>
  );
};

const SMotionInteractive = styled.button`
  background-color: ${props => props.theme.colors.brand.brand1.base};
  width: 15rem;
  height: 3rem;
  border: none;
  color: white;
  &:hover {
    animation: ${props => props.theme.motion.interactive.hover};
  }
  &:active {
    animation: ${props => props.theme.motion.interactive.action};
  }
`;

export const MotionInteractive = ({ path, description }) => {
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={path} value={R.path(p, theme)} description={description}>
          <SMotionInteractive>Interactive Element</SMotionInteractive>
        </Row>
      )}
    </ThemeConsumer>
  );
};

export const Easing = ({ path, description }) => {
  const [state, setState] = useState(false);
  const p = path.split('.');
  return (
    <ThemeConsumer>
      {theme => (
        <Row title={path} value={R.path(p, theme)} description={description}>
          <div
            style={{
              width: '45rem',
              height: '3rem',
              position: 'relative',
              backgroundColor: '#eeeeee'
            }}
          >
            <div
              style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: theme.colors.brand.brand1.base,
                position: 'absolute',
                left: state ? '42rem' : 0,
                top: 0,
                transition: `all ${R.path(p, theme)}`
              }}
            ></div>
          </div>
          <button onClick={() => setState(false)}>Reset</button>
          <button onClick={() => setState(true)}>Start</button>
        </Row>
      )}
    </ThemeConsumer>
  );
};
