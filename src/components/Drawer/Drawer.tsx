import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useCart, useCartMutations } from '@store/Cart';
import CartItemList from '@components/CartItemList/CartItemList';
import CartSummary from '@components/CartSummary/CartSummary';
import { Divider } from 'semantic-ui-react';
import { useCreditCardContext } from '@store/CreditCardContext';

const drawerBleeding = 56;

interface Props {
    window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    // backgroundColor:
    //     theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
     backgroundColor: '#fff'
}));

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const SwipeableEdgeDrawer: React.FC<Props> = ({ window }) => {
    const { items, subTotal } = useCart()
    const { removeFromCart } = useCartMutations()
    const { creditCardNumber, showSummary, setShowSummary } = useCreditCardContext()
    
    const toggleDrawer = (newOpen: boolean) => () => {
        setShowSummary(newOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={showSummary}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                    <Typography sx={{ p: 2, color: 'text.secondary', fontSize: 15, fontWeight: 'bold' }}>Summary</Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        py: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <CartItemList items={items} removeFromCart={removeFromCart} />
                    <Divider />
                    <CartSummary totalAmount={subTotal} />
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
};

export default SwipeableEdgeDrawer;
