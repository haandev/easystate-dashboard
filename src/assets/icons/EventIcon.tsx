import React from "react"

const EventIcon = (props: any) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.502 0.134995C15.6535 0.222929 15.7792 0.349115 15.8666 0.500921C15.954 0.652727 16 0.824827 16 0.999995V4.99999C16.5628 4.99938 17.1193 5.11783 17.6331 5.34757C18.1469 5.57731 18.6062 5.91314 18.981 6.33299C19.6381 7.06583 20.001 8.01572 20 8.99999C20 10.024 19.614 10.96 18.981 11.667C18.6061 12.0867 18.1467 12.4224 17.633 12.6522C17.1193 12.8819 16.5628 13.0004 16 13V17C15.9999 17.1751 15.9539 17.3471 15.8665 17.4989C15.7791 17.6506 15.6533 17.7767 15.5019 17.8646C15.3504 17.9525 15.1785 17.9991 15.0034 17.9997C14.8283 18.0003 14.6561 17.9549 14.504 17.868L8 14.152V19C8 19.2652 7.89464 19.5196 7.70711 19.7071C7.51957 19.8946 7.26522 20 7 20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V14C1.46957 14 0.960859 13.7893 0.585786 13.4142C0.210714 13.0391 0 12.5304 0 12V5.99999C0 5.46956 0.210714 4.96085 0.585786 4.58578C0.960859 4.21071 1.46957 3.99999 2 3.99999H7.734L14.504 0.131995C14.656 0.045053 14.8283 -0.000430417 15.0034 9.6072e-05C15.1785 0.000622561 15.3505 0.0471406 15.502 0.134995ZM8 12C8.174 12.0001 8.34497 12.0456 8.496 12.132L14 15.277V2.72299L8.496 5.86799C8.34497 5.9544 8.174 5.9999 8 5.99999H2V12H8ZM4 14V18H6V14H4ZM16 11C16.592 11 17.123 10.744 17.491 10.333C17.808 9.97899 18 9.51299 18 8.99999C18 8.48699 17.808 8.02099 17.491 7.66699C17.3037 7.45681 17.074 7.2887 16.817 7.17373C16.56 7.05877 16.2815 6.99955 16 6.99999V11Z"
      />
    </svg>
  )
}

export default EventIcon