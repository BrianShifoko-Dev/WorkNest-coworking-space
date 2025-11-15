'use client'

import { useState } from "react";
import { CreditCard, Smartphone, Building2, DollarSign, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { toast } from "sonner";

export function PaymentMethodsClient() {
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [formData, setFormData] = useState({
    // M-Pesa
    mpesaPhone: "",
    // Card
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
    // Bank Transfer
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Payment details submitted successfully!");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs
        items={[{ name: "Payment Methods" }]}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-[#5C4033] to-[#5C4033]/90 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <DollarSign className="w-16 h-16 mx-auto mb-6 text-[#D4AF37]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Payment Methods</h1>
            <p className="text-lg text-white/90">
              Choose your preferred payment method for The WorkNest bookings
            </p>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-[#5C4033]/10">
              <CardHeader>
                <CardTitle className="text-[#5C4033]">Select Payment Method</CardTitle>
                <CardDescription>
                  We accept multiple payment methods for your convenience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Payment Method Selection */}
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* M-Pesa */}
                      <div
                        onClick={() => setPaymentMethod("mpesa")}
                        className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                          paymentMethod === "mpesa"
                            ? "border-[#D4AF37] bg-[#D4AF37]/5"
                            : "border-[#5C4033]/10 hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="mpesa" id="mpesa" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="mpesa" className="cursor-pointer">
                              <div className="flex items-center gap-2 mb-2">
                                <Smartphone className="w-5 h-5 text-[#D4AF37]" />
                                <span className="text-[#5C4033] font-semibold">M-Pesa</span>
                              </div>
                              <p className="text-xs text-[#5C4033]/60">
                                Pay securely with M-Pesa
                              </p>
                            </Label>
                          </div>
                        </div>
                      </div>

                      {/* Credit/Debit Card */}
                      <div
                        onClick={() => setPaymentMethod("card")}
                        className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                          paymentMethod === "card"
                            ? "border-[#D4AF37] bg-[#D4AF37]/5"
                            : "border-[#5C4033]/10 hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="card" id="card" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="card" className="cursor-pointer">
                              <div className="flex items-center gap-2 mb-2">
                                <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                                <span className="text-[#5C4033] font-semibold">Card</span>
                              </div>
                              <p className="text-xs text-[#5C4033]/60">
                                Visa, Mastercard accepted
                              </p>
                            </Label>
                          </div>
                        </div>
                      </div>

                      {/* Bank Transfer */}
                      <div
                        onClick={() => setPaymentMethod("bank")}
                        className={`cursor-pointer border-2 rounded-lg p-4 transition-all ${
                          paymentMethod === "bank"
                            ? "border-[#D4AF37] bg-[#D4AF37]/5"
                            : "border-[#5C4033]/10 hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="bank" id="bank" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="bank" className="cursor-pointer">
                              <div className="flex items-center gap-2 mb-2">
                                <Building2 className="w-5 h-5 text-[#D4AF37]" />
                                <span className="text-[#5C4033] font-semibold">Bank Transfer</span>
                              </div>
                              <p className="text-xs text-[#5C4033]/60">
                                Direct bank transfer
                              </p>
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* M-Pesa Form */}
                  {paymentMethod === "mpesa" && (
                    <div className="bg-[#FFFFF0] p-6 rounded-lg border border-[#5C4033]/10">
                      <h3 className="text-lg font-semibold text-[#5C4033] mb-4 flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-[#D4AF37]" />
                        M-Pesa Payment Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="mpesaPhone" className="text-[#5C4033]">
                            M-Pesa Phone Number *
                          </Label>
                          <Input
                            id="mpesaPhone"
                            type="tel"
                            placeholder="0700 123 456"
                            value={formData.mpesaPhone}
                            onChange={(e) => handleInputChange("mpesaPhone", e.target.value)}
                            className="mt-1"
                            required
                          />
                          <p className="text-xs text-[#5C4033]/60 mt-1">
                            You'll receive an STK push to complete payment
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Form */}
                  {paymentMethod === "card" && (
                    <div className="bg-[#FFFFF0] p-6 rounded-lg border border-[#5C4033]/10">
                      <h3 className="text-lg font-semibold text-[#5C4033] mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                        Card Payment Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber" className="text-[#5C4033]">
                            Card Number *
                          </Label>
                          <Input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                            className="mt-1"
                            maxLength={19}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName" className="text-[#5C4033]">
                            Cardholder Name *
                          </Label>
                          <Input
                            id="cardName"
                            type="text"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange("cardName", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry" className="text-[#5C4033]">
                              Expiry Date *
                            </Label>
                            <Input
                              id="cardExpiry"
                              type="text"
                              placeholder="MM/YY"
                              value={formData.cardExpiry}
                              onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
                              className="mt-1"
                              maxLength={5}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvv" className="text-[#5C4033]">
                              CVV *
                            </Label>
                            <Input
                              id="cardCvv"
                              type="text"
                              placeholder="123"
                              value={formData.cardCvv}
                              onChange={(e) => handleInputChange("cardCvv", e.target.value)}
                              className="mt-1"
                              maxLength={4}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer Form */}
                  {paymentMethod === "bank" && (
                    <div className="bg-[#FFFFF0] p-6 rounded-lg border border-[#5C4033]/10">
                      <h3 className="text-lg font-semibold text-[#5C4033] mb-4 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-[#D4AF37]" />
                        Bank Transfer Details
                      </h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded border border-[#D4AF37]/30 mb-4">
                          <p className="text-sm text-[#5C4033] font-semibold mb-2">
                            Our Bank Details:
                          </p>
                          <div className="space-y-1 text-sm text-[#5C4033]/70">
                            <p><strong>Bank:</strong> Equity Bank Kenya</p>
                            <p><strong>Account Name:</strong> The WorkNest Ltd</p>
                            <p><strong>Account Number:</strong> 0123456789</p>
                            <p><strong>Branch:</strong> Eldoret Branch</p>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="bankName" className="text-[#5C4033]">
                            Your Bank Name *
                          </Label>
                          <Input
                            id="bankName"
                            type="text"
                            placeholder="e.g., KCB Bank"
                            value={formData.bankName}
                            onChange={(e) => handleInputChange("bankName", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountNumber" className="text-[#5C4033]">
                            Your Account Number *
                          </Label>
                          <Input
                            id="accountNumber"
                            type="text"
                            placeholder="Account number"
                            value={formData.accountNumber}
                            onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountName" className="text-[#5C4033]">
                            Account Holder Name *
                          </Label>
                          <Input
                            id="accountName"
                            type="text"
                            placeholder="Full name"
                            value={formData.accountName}
                            onChange={(e) => handleInputChange("accountName", e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <p className="text-xs text-[#5C4033]/60">
                          Please use booking reference number as payment reference
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="bg-[#D4AF37]/10 p-4 rounded-lg border border-[#D4AF37]/30">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-[#5C4033]/80">
                        <p className="mb-2">
                          <strong>Your payment is secure.</strong> We use industry-standard encryption to protect your financial information.
                        </p>
                        <p>All payments are processed securely and your data is never stored on our servers.</p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

