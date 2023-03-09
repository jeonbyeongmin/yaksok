/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has('title');
    const hasStartDate = searchParams.has('startDate');
    const hasEndDate = searchParams.has('endDate');
    const hasStartTime = searchParams.has('startTime');
    const hasEndTime = searchParams.has('endTime');
    const hasParticipantsNumber = searchParams.has('participantsNumber');

    const title = hasTitle ? searchParams.get('title') : 'My default title';
    const startDate = hasStartDate ? searchParams.get('startDate') : '2021-01-01';
    const endDate = hasEndDate ? searchParams.get('endDate') : '2021-01-01';
    const startTime = hasStartTime ? searchParams.get('startTime') : '00:00';
    const endTime = hasEndTime ? searchParams.get('endTime') : '00:00';
    const participantsNumber = hasParticipantsNumber ? searchParams.get('participantsNumber') : '0';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            backgroundSize: '150px 150px',
            flexWrap: 'nowrap',
            flexDirection: 'column',
            position: 'relative',
          }}>
          <div
            style={{
              display: 'flex',
              padding: '40px 60px',
              flexDirection: 'column',
              flexWrap: 'nowrap',
            }}>
            <div
              style={{
                display: 'flex',
                width: '100%',
                marginBottom: '50px',
              }}>
              <svg
                width="236"
                height="74"
                viewBox="0 0 236 74"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.7412 19.4049C11.7412 15.9112 14.51 13.0791 17.9254 13.0791C21.3408 13.0791 24.1096 15.9112 24.1096 19.4049V54.5951C24.1096 58.0887 21.3408 60.9208 17.9254 60.9208C14.51 60.9208 11.7412 58.0887 11.7412 54.5951V19.4049Z"
                  fill="#58B8EE"
                />
                <path
                  d="M29.7832 19.4049C29.7832 15.9112 32.552 13.0791 35.9674 13.0791C39.3828 13.0791 42.1516 15.9112 42.1516 19.4049V54.5951C42.1516 58.0887 39.3828 60.9208 35.9674 60.9208C32.552 60.9208 29.7832 58.0887 29.7832 54.5951V19.4049Z"
                  fill="#58B8EE"
                />
                <path
                  d="M48.2344 19.4049C48.2344 15.9112 51.0031 13.0791 54.4186 13.0791C57.834 13.0791 60.6027 15.9112 60.6027 19.4049V54.5951C60.6027 58.0887 57.834 60.9208 54.4186 60.9208C51.0031 60.9208 48.2344 58.0887 48.2344 54.5951V19.4049Z"
                  fill="#58B8EE"
                />
                <path
                  d="M6.21129 12.5786C9.6417 12.5786 12.4226 9.76282 12.4226 6.28932C12.4226 2.81583 9.6417 0 6.21129 0C2.78089 0 0 2.81583 0 6.28932C0 9.76282 2.78089 12.5786 6.21129 12.5786Z"
                  fill="#106A9D"
                />
                <g clip-path="url(#clip0_965_3708)">
                  <path
                    d="M82.5577 52.4268V41.8913C82.5577 41.5777 82.5087 41.2767 82.337 41.0007L72.3438 23.0024H78.4623C80.8166 27.5553 84.1395 34.0397 85.5373 37.0248C86.788 34.1275 90.3316 27.4299 92.6858 23.0024H98.363L88.1735 40.9631C88.0632 41.1638 87.9651 41.3018 87.9651 41.8411V52.4268H82.5577Z"
                    fill="#58B8EE"
                  />
                  <path
                    d="M102.777 44.9268L100.239 52.4146H94.917L104.849 22.9902H111.593L121.954 52.4146H116.265L113.616 44.9268H102.777ZM112.402 40.3614C110.121 33.6262 108.748 29.6126 108.074 27.1041H108.037C107.326 29.8635 105.805 34.6045 103.978 40.3614H112.402Z"
                    fill="#58B8EE"
                  />
                  <path
                    d="M125.927 23.0024H131.261V36.5858C133.235 34.3157 139.635 27.4299 143.584 23.0024H150.107L138.274 35.294L150.585 52.4268H144.099L134.51 38.8685L131.248 41.9916V52.4268H125.927V23.0024Z"
                    fill="#58B8EE"
                  />
                  <path
                    d="M157.17 43.9484C157.869 47.0965 160.039 48.6016 163.657 48.6016C167.372 48.6016 168.917 46.9836 168.917 44.6131C168.917 42.0294 167.519 40.7752 162.308 39.5209C154.84 37.7023 152.756 34.9806 152.756 30.9545C152.768 26.088 156.312 22.5762 162.982 22.5762C170.351 22.5762 173.319 26.7277 173.723 30.8792H168.279C167.911 28.7972 166.71 26.7653 162.835 26.7653C159.978 26.7653 158.298 28.0196 158.298 30.3524C158.298 32.6477 159.659 33.5633 164.441 34.7172C172.755 36.7365 174.459 39.9599 174.459 43.9735C174.459 49.1284 170.67 52.8284 163.264 52.8284C155.981 52.8284 152.388 49.028 151.738 43.9484H157.17Z"
                    fill="#58B8EE"
                  />
                  <path
                    d="M205.739 37.5894C205.739 45.7419 201.055 52.8535 191.809 52.8535C182.969 52.8535 178.248 46.1433 178.248 37.7148C178.248 29.1985 183.337 22.5762 192.19 22.5762C200.491 22.5762 205.739 28.6718 205.739 37.5894ZM183.839 37.5894C183.839 43.547 186.549 48.3131 192.018 48.3131C197.94 48.3131 200.135 43.2711 200.135 37.6646C200.135 31.8324 197.634 27.1165 191.944 27.1165C186.304 27.1165 183.839 31.6694 183.839 37.5894Z"
                    fill="#58B8EE"
                  />
                  <path
                    d="M211.342 23.0024H216.676V36.5858C218.65 34.3157 225.05 27.4299 228.999 23.0024H235.522L223.689 35.294L236.012 52.4268H229.526L219.949 38.8685L216.688 41.9916V52.4268H211.354V23.0024H211.342Z"
                    fill="#58B8EE"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_965_3708">
                    <rect
                      width="163.656"
                      height="30.2773"
                      fill="white"
                      transform="translate(72.3438 22.5762)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div
              style={{
                fontSize: '60px',
                color: '#3C3E43',
                lineHeight: 1.4,
                fontWeight: '700',
                width: '1080px',
                marginBottom: '60px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              {title}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: '34px',
                gap: '15px',
                color: '#8F8F8F',
                lineHeight: 1.4,
                width: '100%',
                fontWeight: '700',
                alignItems: 'center',
              }}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '15px',
                  alignItems: 'center',
                }}>
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.8594 10.0033V2.49658H18.9844V10.0033H15.8594ZM41.0148 10.0033V2.49658H44.1398V10.0033H41.0148Z"
                    fill="currentColor"
                  />
                  <path d="M15 22.5034H19.4081V26.9115H15V22.5034Z" fill="currentColor" />
                  <path d="M28.7812 22.5034H33.1893V26.9115H28.7812V22.5034Z" fill="currentColor" />
                  <path d="M42.5635 22.5034H46.9715V26.9115H42.5635V22.5034Z" fill="currentColor" />
                  <path d="M42.5635 39.4106H46.9715V43.8187H42.5635V39.4106Z" fill="currentColor" />
                  <path d="M28.7812 39.4106H33.1893V43.8187H28.7812V39.4106Z" fill="currentColor" />
                  <path d="M15 39.4102H19.4081V43.8182H15V39.4102Z" fill="currentColor" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M51.875 12.3505C51.875 11.4582 51.1754 10.7348 50.3125 10.7348H9.6875C8.82456 10.7348 8.125 11.4582 8.125 12.3505V52.6563C8.125 53.5486 8.82455 54.272 9.6875 54.272H50.3125C51.1754 54.272 51.875 53.5486 51.875 52.6563V12.3505ZM8.125 7.50342C6.39911 7.50342 5 8.95017 5 10.7348V54.272C5 56.0567 6.39911 57.5034 8.125 57.5034H51.875C53.6009 57.5034 55 56.0567 55 54.272V10.7348C55 8.95017 53.6009 7.50342 51.875 7.50342H8.125Z"
                    fill="currentColor"
                  />
                </svg>
                <div
                  style={{
                    flexShrink: 0,
                  }}>
                  {`${startDate} - ${endDate}`}
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '15px',
                  alignItems: 'center',
                }}>
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M30 10.3464C19.1456 10.3464 10.3464 19.1456 10.3464 30C10.3464 40.8544 19.1456 49.6536 30 49.6536C40.8544 49.6536 49.6536 40.8544 49.6536 30C49.6536 19.1456 40.8544 10.3464 30 10.3464ZM7.5 30C7.5 17.5736 17.5736 7.5 30 7.5C42.4264 7.5 52.5 17.5736 52.5 30C52.5 42.4264 42.4264 52.5 30 52.5C17.5736 52.5 7.5 42.4264 7.5 30ZM30 20.1949C30.786 20.1949 31.4232 20.8321 31.4232 21.6182V31.6088L38.3539 33.919C39.0995 34.1676 39.5025 34.9736 39.254 35.7193C39.0054 36.4649 38.1994 36.8679 37.4537 36.6194L29.5499 33.9848C28.9688 33.7911 28.5768 33.2472 28.5768 32.6346V21.6182C28.5768 20.8321 29.214 20.1949 30 20.1949Z"
                    fill="#8F8F8F"
                  />
                </svg>

                <div
                  style={{
                    flexShrink: 0,
                  }}>
                  {`${startTime} - ${endTime}`}
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '15px',
                  alignItems: 'center',
                }}>
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M30.0001 11.6308C26.6475 11.6308 23.9297 14.3486 23.9297 17.7011C23.9297 21.0537 26.6475 23.7715 30.0001 23.7715C33.3527 23.7715 36.0704 21.0537 36.0704 17.7011C36.0704 14.3486 33.3527 11.6308 30.0001 11.6308ZM21.3117 17.7011C21.3117 12.9026 25.2016 9.0127 30.0001 9.0127C34.7986 9.0127 38.6885 12.9026 38.6885 17.7011C38.6885 22.4996 34.7986 26.3895 30.0001 26.3895C25.2016 26.3895 21.3117 22.4996 21.3117 17.7011ZM14.4037 36.5061C17.9685 33.74 23.2016 32.127 30.0001 32.127C36.7985 32.127 42.0317 33.74 45.5965 36.5061C49.1903 39.2948 50.9875 43.183 50.9875 47.4491C50.9875 49.2702 49.6294 50.9875 47.672 50.9875H12.3282C10.3708 50.9875 9.0127 49.2702 9.0127 47.4491C9.0127 43.183 10.8098 39.2948 14.4037 36.5061ZM16.0087 38.5745C13.0665 40.8576 11.6308 43.976 11.6308 47.4491C11.6308 48.0905 12.0693 48.3694 12.3282 48.3694H47.672C47.9309 48.3694 48.3694 48.0905 48.3694 47.4491C48.3694 43.976 46.9337 40.8576 43.9915 38.5745C41.0203 36.269 36.4142 34.745 30.0001 34.745C23.5859 34.745 18.9799 36.269 16.0087 38.5745Z"
                    fill="#8F8F8F"
                  />
                </svg>

                <div
                  style={{
                    flexShrink: 0,
                  }}>
                  {`${participantsNumber}명 참여 가능`}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: '100%',
              height: '30px',
              position: 'absolute',
              bottom: '0',
              background:
                'linear-gradient(93.62deg, rgba(88, 184, 238, 0.48) 4.12%, rgba(236, 211, 255, 0.8) 58.48%, rgba(227, 243, 252, 0.8) 100.53%)',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
