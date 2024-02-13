import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

const CreditCardContext = React.createContext<CreditCardContext | null>(null);

export function CreditCardContextProvider({
    children,
}: CreditCardContextProviderProps) {
    const [creditCardNumber, setCreditCardNumber] = useState<CreditCardValue | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [showSummary,setShowSummary] = useState(false);
    const [cardData, setCardData] = useState<any>({
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
        acceptedCards: ['visa', 'mastercard'],
    });
    const [formErrors, setFormErrors] = useState<any>({});
    const [portalOpen, setPortalOpen] = useState(false);

    const cleanState = () => {
        setFormErrors({});
        setCardData({
            cvc: '',
            expiry: '',
            focus: '',
            name: '',
            number: '',
            acceptedCards: ['visa', 'mastercard'],
        })
    }

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        cleanState();

    };

    const handlePortalClose = () => setPortalOpen(false);
    const handlePortalOpen = () => setPortalOpen(true);

    const value = useMemo(
        () => ({
            creditCardNumber,
            setCreditCardNumber,
            modalOpen, 
            setModalOpen,
            cardData, 
            setCardData,
            formErrors, 
            setFormErrors,
            portalOpen, 
            setPortalOpen,
            cleanState,
            handleModalOpen,
            handleModalClose,
            handlePortalClose,
            handlePortalOpen,
            showSummary,
            setShowSummary,
        }),
        [
            creditCardNumber,
            setCreditCardNumber,
            modalOpen, 
            setModalOpen,
            cardData, 
            setCardData,
            formErrors, 
            setFormErrors,
            portalOpen, 
            setPortalOpen,
            cleanState,
            handleModalOpen,
            handleModalClose,
            handlePortalClose,
            handlePortalOpen,
            showSummary,
            setShowSummary,
        ]
    );

    return (
        <CreditCardContext.Provider value={value}>
            {children}
        </CreditCardContext.Provider>
    );
}

export function useCreditCardContext() {
    const context = useContext(CreditCardContext);

    if (!context) {
        throw new Error(
            'CreditCardContext must be used within a AuthContextProvider'
        );
    }

    return context;
}

export interface CreditCardContext {
    creditCardNumber: CreditCardValue | null;
    setCreditCardNumber: React.Dispatch<React.SetStateAction<CreditCardValue | null>>;
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cardData: CreditCardData;
    setCardData: React.Dispatch<React.SetStateAction<CreditCardData>>;
    formErrors: any;
    setFormErrors: React.Dispatch<React.SetStateAction<any>>;
    portalOpen: boolean;
    setPortalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cleanState: () => void;
    handleModalOpen: () => void;
    handleModalClose: () => void;
    handlePortalClose: () => void;
    handlePortalOpen: () => void;
    showSummary:boolean;
    setShowSummary:React.Dispatch<React.SetStateAction<boolean>>;
  };

export interface CreditCardContextProviderProps {
    children: ReactNode;
}

export interface CreditCardValue {
    number: string;
    name: string;
}

export interface CreditCardData {
    cvc: string;
    expiry: string;
    focus: string;
    name: string;
    number: string;
    acceptedCards: string[];
  }
  