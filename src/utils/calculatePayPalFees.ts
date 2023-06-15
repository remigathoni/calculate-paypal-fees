export default function calculatePayPalFees(amount:number, rate=4.4, fixed=0.3) {
    return (amount * rate) + fixed
}