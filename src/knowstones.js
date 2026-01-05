/**
 * Class to house getting and saving knowstones
 */
export class Knowstones {
  /**
   * Get the number of knowstones from local storage
   * @returns {number}
   */
  static get() {
    const stored = localStorage.getItem("knowstones");
    return stored ? parseInt(stored, 10) : 0;
  }

  /**
   * Save the number of knowstones to local storage
   * @param {number} count
   */
  static save(count) {
    localStorage.setItem("knowstones", count.toString());
  }

  /**
   * Reset the number of knowstones to 0
   */
  static reset() {
    localStorage.removeItem("knowstones");
  }

  /**
   * Add a knowstone to the count
   * @param {number} count
   */
  static add(count) {
    const currentCount = this.get();
    this.save(currentCount + count);
  }

  /**
   * Remove knowstones from the count
   * @param {number} count
   */
  static remove(count) {
    const currentCount = this.get();
    this.save(currentCount - count);
  }
}
