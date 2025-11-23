import React from "react";
import { Link } from "react-router-dom";
import MainNav from "../../components/MainNav";
import Footer from "../../components/Footer";

export default function Terms() {
    return (
        <div className="min-h-screen bg-background text-text">
            <MainNav />
            <div className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-black tracking-tight mb-6">Termos de Serviço</h1>
                <div className="text-muted text-xs mb-6">Última atualização: 22 de novembro de 2024</div>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">1. Aceitação dos Termos</h2>
                        <p className="text-muted leading-relaxed">
                            Ao acessar e usar esta plataforma, você aceita e concorda em ficar vinculado aos termos e condições deste acordo. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
                        </p>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">2. Uso da Plataforma</h2>
                        <p className="text-muted leading-relaxed mb-4">
                            Você concorda em usar a plataforma apenas para fins legais e de acordo com estes Termos. Você não deve:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted">
                            <li>Usar a plataforma de qualquer forma que viole leis ou regulamentos aplicáveis</li>
                            <li>Transmitir qualquer material que seja difamatório, obsceno ou ofensivo</li>
                            <li>Tentar obter acesso não autorizado a qualquer parte da plataforma</li>
                            <li>Interferir ou interromper a integridade ou desempenho da plataforma</li>
                        </ul>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">3. Contas de Usuário</h2>
                        <p className="text-muted leading-relaxed">
                            Ao criar uma conta, você é responsável por manter a confidencialidade de suas credenciais e por todas as atividades que ocorram sob sua conta. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta.
                        </p>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">4. Pagamentos e Reembolsos</h2>
                        <p className="text-muted leading-relaxed">
                            Todos os pagamentos são processados de forma segura através de nossos parceiros de pagamento. As políticas de reembolso variam de acordo com o tipo de serviço ou ingresso adquirido e são especificadas no momento da compra.
                        </p>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">5. Propriedade Intelectual</h2>
                        <p className="text-muted leading-relaxed">
                            Todo o conteúdo da plataforma, incluindo textos, gráficos, logos e software, é propriedade nossa ou de nossos licenciadores e está protegido por leis de direitos autorais e outras leis de propriedade intelectual.
                        </p>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">6. Limitação de Responsabilidade</h2>
                        <p className="text-muted leading-relaxed">
                            Em nenhuma circunstância seremos responsáveis por quaisquer danos indiretos, incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de usar nossos serviços.
                        </p>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">7. Modificações dos Termos</h2>
                        <p className="text-muted leading-relaxed">
                            Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos os usuários sobre mudanças significativas através da plataforma ou por e-mail.
                        </p>
                    </section>

                    <section className="bg-surface border border-border rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-text mb-4">8. Contato</h2>
                        <p className="text-muted leading-relaxed">
                            Para questões sobre estes Termos de Serviço, entre em contato conosco através de{" "}
                            <a href="mailto:legal@example.com" className="text-primary hover:underline">legal@example.com</a>
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border text-center">
                    <Link to="/" className="text-primary hover:underline">
                        ← Voltar para a página inicial
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}
