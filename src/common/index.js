const backendDomain = "https://stationary-ecommerce-backend-ten.vercel.app/api"

const SummaryApi = {
    signUp : {
        url : `${backendDomain}/signup`,
        method : "post",
    },
    signIn : {
        url : `${backendDomain}/signin`,
        method : "post",
    },
    current_user : {
        url : `${backendDomain}/user-details`,
        method : "get",
    },
    logout_user : {
        url : `${backendDomain}/userLogout`,
        method : "get",
    },
    allUser : {
        url : `${backendDomain}/all-user`,
        method : "get",
    },
    updateUser : {
        url : `${backendDomain}/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomain}/upload-product`,
        method : "post"
    },
    allProduct : {
        url : `${backendDomain}/get-product`,
        method : "get"
    },
    updateProduct : {
        url : `${backendDomain}/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${backendDomain}/get-categoryProduct`,
        method : "get"
    },
    categoryWiseProduct : {
        url : `${backendDomain}/category-product`,
        method : "post"
    },
    productDetails : {
        url : `${backendDomain}/product-details`,
        method : "post"
    },
    addToCartProduct : {
        url : `${backendDomain}/addtocart`,
        method : "post"
    },
    addToCartProductCount : {
        url : `${backendDomain}/countAddToCartProduct`,
        method : "get"
    },
    addToCartProductView : {
        url : `${backendDomain}/view-card-product`,
        method : "get"
    },
    updateCartProduct : {
        url : `${backendDomain}/update-cart-product`,
        method : "post"
    },
    deleteCartProduct : {
        url : `${backendDomain}/delete-cart-product`,
        method : "post"
    },
    searchProduct : {
        url : `${backendDomain}/search`,
        method : "get"
    },
    filterProduct : {
        url : `${backendDomain}/filter-product`,
        method : "post"
    }          
};

export default SummaryApi;