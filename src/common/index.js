const backendDomain = "https://stationary-ecommerce-backend-ten.vercel.app/api"

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/signup`,
        method : "POST",
    },
    signIn : {
        url : `${backendDomain}/signin`,
        method : "POST",
    },
    current_user : {
        url : `${backendDomain}/user-details`,
        method : "GET",
    },
    logout_user : {
        url : `${backendDomain}/userLogout`,
        method : "GET",
    },
    allUser : {
        url : `${backendDomain}/all-user`,
        method : "GET",
    },
    updateUser : {
        url : `${backendDomain}/update-user`,
        method : "POST"
    },
    uploadProduct : {
        url : `${backendDomain}/upload-product`,
        method : "POST"
    },
    allProduct : {
        url : `${backendDomain}/get-product`,
        method : "GET"
    },
    updateProduct : {
        url : `${backendDomain}/update-product`,
        method : "POST"
    },
    categoryProduct : {
        url : `${backendDomain}/get-categoryProduct`,
        method : "GET"
    },
    categoryWiseProduct : {
        url : `${backendDomain}/category-product`,
        method : "POST"
    },
    productDetails : {
        url : `${backendDomain}/product-details`,
        method : "POST"
    },
    addToCartProduct : {
        url : `${backendDomain}/addtocart`,
        method : "POST"
    },
    addToCartProductCount : {
        url : `${backendDomain}/countAddToCartProduct`,
        method : "GET"
    },
    addToCartProductView : {
        url : `${backendDomain}/view-card-product`,
        method : "GET"
    },
    updateCartProduct : {
        url : `${backendDomain}/update-cart-product`,
        method : "POST"
    },
    deleteCartProduct : {
        url : `${backendDomain}/delete-cart-product`,
        method : "POST"
    },
    searchProduct : {
        url : `${backendDomain}/search`,
        method : "GET"
    },
    filterProduct : {
        url : `${backendDomain}/filter-product`,
        method : "POST"
    }          
};

export default SummaryApi;