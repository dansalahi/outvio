
export class OrderUtils {
  /**
   * Format the order date for display.
   * @param order - The order object.
   * @returns Formatted date string.
   */
  static formatOrderDate(orderDate: string): string {
    const date = new Date(orderDate);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',

      formatMatcher: 'best fit',
      });
  }
}
