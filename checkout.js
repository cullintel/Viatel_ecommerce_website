document.addEventListener("DOMContentLoaded", function () {
    const totalDisplay = document.querySelector(".summary-total");
  
    const loadTotalFromLocalStorage = () => localStorage.getItem("cartTotal") || "0";
  
    const updateOrderSummary = () => {
      const total = loadTotalFromLocalStorage();
      totalDisplay.textContent = `Ksh ${parseInt(total).toLocaleString()}`;
    };
  
    updateOrderSummary();
  });