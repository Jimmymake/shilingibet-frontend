import { tenantId } from "../utils/configs";
import { fetchAPI } from "../utils/FetchApi";
import BaseClass from "./BaseClass";

export class PaymentService extends BaseClass {
  constructor() { 
    super();
  }

  /**
   * Normalize any local phone (e.g. 0115024811, 07949490160, +2547..., 2547...)
   * into msisdn format without plus, e.g. 254115024811, 254794940160
   */
  normalizeMsisdnFromPhone(rawPhone) {
    if (!rawPhone) return null;

    // Keep only digits
    let digits = String(rawPhone).replace(/\D/g, "");

    // Already starts with 254 (e.g. 254768899729)
    if (digits.startsWith("254")) {
      return digits;
    }

    // Starts with 0 (e.g. 0115024811, 07949490160)
    if (digits.startsWith("0") && digits.length >= 10) {
      return `254${digits.slice(1)}`;
    }

    // Starts with country code without leading 2 digits (fallback)
    // If it's 9 or 10 digits and does not start with 0, assume local and prefix 254
    if (!digits.startsWith("0") && digits.length >= 9) {
      return `254${digits}`;
    }

    return null;
  }

  async depositCash({ amount }) {
    const payload = {
      amount: +amount,
      tenantId: "6943002589b5cc2e2cb52042",
    };

    try {
      return await fetchAPI("wallet/deposit", "POST", payload, this.token);
    } catch (error) {
      throw new Error(error?.message || "Something went wrong");
    }
  }
  async updateBalance() {
    try {
      // Prefer external balance service based on msisdn
      const msisdn = this.normalizeMsisdnFromPhone(this.phone);

      if (!msisdn) {
        throw new Error("Could not determine phone number for balance lookup");
      }

      const response = await fetch(
        `http://104.248.212.223:5001/api/balance/${msisdn}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }

      const data = await response.json();
      // Shape: { msisdn: "254xxxx", balance: 1.0 }
      return data;
    } catch (error) {
      throw new Error(error?.message || "Something went wrong");
    }
  }
  async withdrawCash({ withdrawAmount, issueKey }) {
    const payload = {
      amount: +withdrawAmount,
      tenantId,
    };

    try {
      return await fetchAPI(
        `wallet/withdraw/${issueKey}`,
        "POST",
        payload,
        this.token
      );
    } catch (error) {
      throw new Error(error?.message || "Something went wrong");
    }
  }
  async transactionHistory() {
    try {
      return await fetchAPI(
        `user/getUserTransactions`,
        "GET",
        null,
        this.token
      );
    } catch (error) {
      throw new Error(error?.message || "Something went wrong");
    }
  }
  async getTransactionStatus(uniqueID) {
    try {
      return await fetchAPI(
        `wallet/checkDepositStatus`,
        "POST",
        { uniqueID, tenantId },
        this.token
      );
    } catch (error) {
      throw new Error(error?.message || "Something went wrong");
    }
  } // Get withdrawal transaction status
  async getWithdrawalTransactionStatus(uniqueID) {
    const response = await fetchAPI(
      "wallet/checkDepositStatus",
      "POST",
      { uniqueID },
      this.token
    );

    if (response?.status === 409) {
      throw new Error("Too many withdrawal requests. Please try later.");
    }

    return response;
  }
  async createPaymentKey() {
    try {
      return await fetchAPI("wallet/createIssueKey", "POST", null, this.token);
    } catch (error) {
      throw new Error(error?.message || "Something went wrong");
    }
  }

  async redeemBonus({ amount, type }) {
    const payload = {
      amount: +amount,
      tenantId,
      type,
    };
    try {
      return await fetchAPI("user/redeem-bonus", "POST", payload, this.token);
    } catch (error) {
      throw new Error(error?.message || "Something went wrong");
    }
  }

  async payWithCrypto({ data: { trasactionID } }) {
    try {
      if (!trasactionID) {
        throw new Error("Transaction ID is required");
      }

      const payload = {
        txid: trasactionID,
        phone: "mamlaka",
      };

      const response = await fetch(`https://api.swapuzi.com/confirmcrypto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to process crypto payment");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error(error?.message || "Something went wrong");
    }
  }

  async updateCryptoWalletBalance(updateBalanceData) {
    console.log(updateBalanceData);
    try {
      return await fetchAPI(
        `wallet/crypto/deposit`,
        "POST",
        updateBalanceData?.updateBalanceData,
        this.token
      );
    } catch (error) {
      throw new Error(error?.message || "Something went wrong");
    }
  }

  async withdrawViaTelkom({ msisdn, amount, info1 }) {
    try {
      const payload = {
        msisdn: msisdn,
        amount: +amount,
        info1: info1 || "Payment for services"
      };

      const response = await fetch('http://104.248.212.223:5001/api/b2c/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to process withdrawal');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error?.message || "Something went wrong");
    }
  }

  async withdrawToOtherProvider({ destinationMsisdn, amount, callbackUrl }) {
    try {
      const payload = {
        destinationMsisdn: destinationMsisdn,
        amount: amount.toString(),
        callbackUrl: callbackUrl
      };

      const response = await fetch('http://104.248.212.223:5001/api/third-party/send-money', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to process external withdrawal');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error?.message || "Something went wrong");
    }
  }
}
