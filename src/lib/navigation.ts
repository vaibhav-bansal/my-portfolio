/**
 * Navigation utility functions for consistent scroll behavior
 */

/**
 * Scrolls to the top of the page with smooth animation
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/**
 * Handles navigation with scroll-to-top behavior
 * @param href - The href to navigate to
 * @param currentPath - The current pathname
 * @param navigate - React Router navigate function (optional)
 */
export const handleNavigation = (
  href: string, 
  currentPath: string, 
  navigate?: (path: string) => void
) => {
  // If navigating to a different page (not hash links), scroll to top
  if (!href.startsWith('#') && href !== currentPath) {
    scrollToTop();
  }
  
  // If navigate function is provided, use it for programmatic navigation
  if (navigate && href !== currentPath) {
    navigate(href);
  }
};

/**
 * Handles navigation click events
 * @param href - The href to navigate to
 * @param currentPath - The current pathname
 * @param onClose - Optional callback for closing menus/dropdowns
 * @param navigate - React Router navigate function (optional)
 */
export const handleNavigationClick = (
  href: string,
  currentPath: string,
  onClose?: () => void,
  navigate?: (path: string) => void
) => {
  // Close any open menus/dropdowns
  if (onClose) {
    onClose();
  }
  
  // Handle navigation with scroll behavior
  handleNavigation(href, currentPath, navigate);
};
