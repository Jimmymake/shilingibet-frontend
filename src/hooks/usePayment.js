import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PaymentService } from "../services/PaymentService";

export function useDeposit() {
  const paymentService = new PaymentService();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: makingPayment,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: paymentService.depositCash.bind(paymentService),
    onSuccess: (res) => {
      toast.success(
        "Check your phone. When prompted, enter your Telkom pin on your phone to complete payment"
      ); // ✅ invalidate balance after deposit
      queryClient.invalidateQueries({ queryKey: ["user-balance"] });
      navigate(`/callback/${res?.data?.txnID}`);
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
  });

  return { makingPayment, isLoading, error };
}

export function useWithdraw() {
  const paymentService = new PaymentService();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: withdrawingCash,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: paymentService.withdrawViaTelkom.bind(paymentService),
    onSuccess: (res) => {
      if (res?.creditSyncResponse?.resultCode !== "0") {
        toast.error(
          res?.creditSyncResponse?.message ?? "Something went wrong try again later"
        );
      } else {
        // ✅ invalidate balance after withdrawal
        queryClient.invalidateQueries({ queryKey: ["user-balance"] });
        toast.success("Withdrawal in progress");
      }
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
  });
  return { withdrawingCash, isLoading, error };
}
export function useUpdateBalance() {
  const paymentService = new PaymentService();

  const { data: balance, isLoading } = useQuery({
    queryKey: ["user-balance"],
    queryFn: paymentService.updateBalance.bind(paymentService),
  });

  // Hardcode balance to KES 500
  const hardcodedBalance = {
    balance: 500,
    referralBonus: balance?.referralBonus ?? 0,
    cashback: balance?.cashback ?? 0,
    referralsCount: balance?.referralsCount ?? 0,
  };

  return { balance: hardcodedBalance, isLoading };
}
export function useTransactionsHistory() {
  const paymentService = new PaymentService();
  const {
    data: transactions,
    isLoading,
    error,
  } = useQuery({
    queryFn: paymentService.transactionHistory.bind(paymentService),
    queryKey: ["transactions"],
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong fetching your history");
    },
  });

  return { transactions, isLoading, error };
}
export function useGetTransactionStatus() {
  const paymentService = new PaymentService();
  const {
    mutate: getTransactionStatusAPI,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (uniqueID) =>
      paymentService.getTransactionStatus.bind(paymentService)(uniqueID),
    onSuccess: () => {},
  });

  return { getTransactionStatusAPI, isLoading, error };
}
export function useIssueKey() {
  const paymentService = new PaymentService();
  const {
    mutate: creatingKey,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: paymentService.createPaymentKey?.bind(paymentService),
  });

  return { creatingKey, isLoading, error };
}
export default function useRedeemBonus() {
  const navigate = useNavigate();
  const paymentService = new PaymentService();
  const queryClient = useQueryClient();
  const {
    mutate: redeemingBonus,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: paymentService.redeemBonus?.bind(paymentService),
    onSuccess: (res) => {
      if (res.status !== true) {
        toast.error(
          res?.data?.message ?? "Something went wrong try again later"
        );
      } else {
        // ✅ Invalidate balance query after success
        queryClient.invalidateQueries({ queryKey: ["user-balance"] });
        navigate("/profile");
        toast.success(res?.data?.message ?? "Bonus redeemed successfully");
      }
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
  });

  return { redeemingBonus, isLoading, error };
}

export function useCryptoDeposit() {
  const paymentService = new PaymentService();

  const {mutate: depositCrypto, isPending: isLoading, error} = useMutation({
    mutationFn: paymentService.payWithCrypto?.bind(paymentService),
  })

  return {depositCrypto, isLoading, error};
}

export function useCryptoUpdateDeposit() {
  const paymentService = new PaymentService();
    const queryClient = useQueryClient();
  
  const {mutate: depositCrypto, isPending: isLoading, error} = useMutation({
    mutationFn: paymentService.updateCryptoWalletBalance?.bind(paymentService),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-balance"] });
      // window.location.reload();
    }
  })

  return {depositCrypto, isLoading, error};
}

export function useWithdrawToOtherProvider() {
  const paymentService = new PaymentService();
  const queryClient = useQueryClient();
  const {
    mutate: withdrawingToOther,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: paymentService.withdrawToOtherProvider.bind(paymentService),
    onSuccess: (res) => {
      // ✅ invalidate balance after withdrawal
      queryClient.invalidateQueries({ queryKey: ["user-balance"] });
      toast.success("Withdrawal to other provider in progress");
    },
    onError: (err) => {
      toast.error(err?.message ?? "Something went wrong");
    },
  });
  return { withdrawingToOther, isLoading, error };
}
