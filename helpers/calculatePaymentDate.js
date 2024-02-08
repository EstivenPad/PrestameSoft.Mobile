export const calculatePaymentDate = (payments) => {
    
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const firstFortnightDays = [15,16,17];
    const secondFortnightDays = [lastDayOfMonth.getDate(),1,2];

    let fortnight = false;

    if(today.getDate() >= 15 && today.getDate() < lastDayOfMonth.getDate())
        fortnight = false;
    else
        fortnight = true;

    // const lastPayment = payments.slice(-1);
    console.log(payments);
};
