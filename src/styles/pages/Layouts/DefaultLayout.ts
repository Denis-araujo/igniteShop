import { styled } from "../.."


export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})

export const Cart = styled('button', {
  background: '$gray800',
  color: '$white',
  borderRadius: 6,
  padding: '0.5rem',
  border: 0,

  '&:hover': {
    cursor: 'pointer'
  },
})

export const ShoppingBag = styled('div', {
  position: 'absolute',
  right: 0,
  bottom: 0,
  height: '100%',
  background: '$gray800',
  zIndex: 1,

  display: 'flex',
  flexDirection: 'column',
  padding: '0px 3rem',

  svg: {
    position: 'absolute',
    top: '28px',
    right: '28px',

    '&:hover': {
      cursor: 'pointer',
    }
  },

  p: {
    fontWeight: 700,
    fontSize: "1.25rem",
    marginTop: '4.5rem',
    marginBottom: '2rem'
  },
})

export const ListProducts = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
})

export const Product = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  gap: '1.25rem',

  img: {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: '8px',
  },

  div: {
    display: 'flex',
    flexDirection: 'column',

    span: {
      fontWeight: 400,
      fontSize: '1.2rem',
      color: '$gray300'
    },

    strong: {
      fontWeight: 700,
      color: '$gray100',
      marginTop: '2px',
      marginBottom: '0.5rem'
    },

    button: {
      border: '0',
      background: 'none',
      textAlign: 'start',
      color: '$green500',
      fontSize: '1rem',

      '&:hover': {
        cursor: 'pointer',  
      }
    }
  }
})

export const ShoppingBagFooter = styled('footer', {
  marginTop: '2rem',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.5rem',

    span: {
      fontWeight: 400,
      fontSize: '1rem',
      color: '$gray100',
    },

    strong: {
      fontWeight: 700,
      fontSize: '1.2rem',
    },
  },

  button: {
    background: '$green500',
    color: '$white',
    fontWeight: 700,
    fontSize: '1.2rem',
    borderRadius: '8px',
    marginTop: '3.4rem',

    width: '100%',
    height: '4rem',

    border: '0px',

    '&:hover': {
      cursor: 'pointer'
    },
  },
})