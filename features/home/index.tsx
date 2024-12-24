import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

import { HomeHeader } from "@/features/home/ui/header";
import { CreditCardsWidget } from "@/features/home/widgets/credit-cards";
import { AccountsWidget } from "@/features/home/widgets/accounts";
import { BudgetsWidget } from "@/features/home/widgets/budget";
import { InvestmentsWidget } from "@/features/home/widgets/investments";
import { CashFlowWidget } from "@/features/home/widgets/cash-flow";

export function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <HomeHeader ballance={2000} />
      <ScrollView>
        <CashFlowWidget
          incomeBallance={4000}
          outcomeBallance={3900}
          incomeFuture={10000}
          outcomeFuture={5000}
        />
        <CreditCardsWidget creditCards={[]} />
        <AccountsWidget accounts={[]} />
        <BudgetsWidget budgets={[]} />
        <InvestmentsWidget investments={[]} />
      </ScrollView>
    </>
  );
}
