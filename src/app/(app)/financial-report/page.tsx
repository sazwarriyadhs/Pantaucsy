"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { financialReportData } from "@/lib/data"
import { useI18n } from "@/context/i18n-provider"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export default function FinancialReportPage() {
  const { t, formatCurrency } = useI18n()

  const { summary, transactions, monthlyOverview } = financialReportData

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{t('finance.report.title')}</h1>
        <p className="text-muted-foreground">
          {t('finance.report.description')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t('finance.report.totalIncome')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(summary.totalIncome)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('finance.report.totalExpense')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(summary.totalExpense)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('finance.report.currentBalance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(summary.currentBalance)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('finance.report.monthlyOverview')}</CardTitle>
          <CardDescription>{t('finance.report.monthlyOverviewDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <BarChart data={monthlyOverview.map(d => ({ ...d, month: t(`finance.report.months.${d.monthKey}`) }))} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(value) => formatCurrency(Number(value)).replace(/,00$/, '')}
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent
                  formatter={(value, name) => (
                    <div className="flex flex-col">
                      <span className="capitalize">{t(`finance.report.${name}`)}</span>
                      <span>{formatCurrency(Number(value))}</span>
                    </div>
                  )}
                />}
              />
              <Bar dataKey="income" name="income" fill="hsl(var(--primary))" radius={4} />
              <Bar dataKey="expense" name="expense" fill="hsl(var(--destructive))" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('finance.report.transactionHistory')}</CardTitle>
          <CardDescription>{t('finance.report.transactionHistoryDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('finance.report.date')}</TableHead>
                <TableHead>{t('finance.report.descriptionColumn')}</TableHead>
                <TableHead>{t('finance.report.type')}</TableHead>
                <TableHead className="text-right">{t('finance.report.amount')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{t(`finance.report.transactions.${transaction.descriptionKey}`)}</TableCell>
                  <TableCell>
                     <span className={`px-2 py-1 text-xs rounded-full ${
                       transaction.type === 'income' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                     }`}>
                       {t(`finance.report.types.${transaction.type}`)}
                     </span>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    transaction.type === 'income' ? 'text-primary' : 'text-destructive'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
