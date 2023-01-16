import styled from 'styled-components'

export const ListStatuses = styled.div`
display: inline-flex;
background: white;
box-shadow: 2px 2px 6px 0px lightgrey;
border-radius: 2px;
margin-top: 12px;
margin-left: auto;
margin-right: auto;
`
export const Status = styled.a`
padding: 4px 60px 4px 40px;
position: relative;
line-height: 30px;
display: block;
color: black;
cursor:pointer;
background-color: ${(props:{bg:string}) => props.bg === 'active' ? "#2185d0" : '#fff'};
&:after {
  content: "";
  background: white;
  position: absolute;
  right: -15px;
  top: 5px;
  width: 27px;
  height: 27px;
  transform: rotate(45deg);
  clear: both;
  z-index: 22;
  margin-right: 1px;
  box-shadow: 1px -1px 0px 0px lightgrey;
  background:${(props:{bg:string}) => props.bg === 'active' ? "#2185d0" : '#fff'};
  color: ${(props:{bg:string}) => props.bg === 'active' ? "#fff" : 'black'};;
}
&:last-of-type {
  padding-right: 20px;
}
&:last-of-type:after {
  width: 0;
}

`


// .status.active,
// .status.active:after {
//   background: #2185d0;
//   color: white;
// }

// .status:hover,
// .status:hover:after {
//   background: lightgray;
// }

// .status:after {
 
// }

// .status:last-of-type {
//   padding-right: 20px;
// }

// .status:last-of-type:after {
//   width: 0;
// }
